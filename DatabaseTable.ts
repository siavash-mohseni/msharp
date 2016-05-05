namespace MSharp {

    export class DatabaseTable<T extends Entity> {

        constructor(public tableName: string, public className, public database: BaseDatabase) { }

        async getList(criteria: (item: T) => boolean = null): Promise<Array<T>> {
            var transaction = this.database.db.transaction(this.tableName, "readonly");
            var store = transaction.objectStore(this.tableName);

            return new Promise<Array<T>>((resolve, reject) => {
                var request = store.openCursor();

                var result: Array<T> = [];

                request.onsuccess = () => {

                    if (request.result) {

                        var cursor = request.result;
                        if (cursor) {

                            var item: T = new window["Domain"][this.className](cursor.value);

                            item.isNew = false;

                            result.push(item);
                            cursor.continue();
                        }
                    }
                    else {
                        resolve(result);
                    }
                };
                request.onerror = e => { reject(e.target.error); };
            });
        }

        async get(id: string): Promise<T> {
            var transaction = this.database.db.transaction(this.tableName, "readonly");
            var store = transaction.objectStore(this.tableName);

            return new Promise<T>((resolve, reject) => {
                var request = store.get(id);
                request.onsuccess = () => {
                    if (request.result) {
                        var data = request.result;
                        data.IsNew = false;

                        var result = new window["Domain"][this.className](data);

                        resolve(result);
                    }
                    else {
                        reject("Could not find a record in the table " + this.tableName + " with the id: " + id);
                    }
                };
                request.onerror = e => { reject(e.target.error); };
            });
        }

        async find(criteria: (item: T) => boolean): Promise<T> { return null; }

        async save(item: T): Promise<T> {

            var updated = !item.isNew;

            await item.onValidating();
            await item.validate();
            await item.onSaving();

            var transaction = this.database.db.transaction(this.tableName, "readwrite");
            var store = transaction.objectStore(this.tableName);

            return new Promise<T>((resolve, reject) => {
                store.put(item);
                transaction.oncomplete = () => {
                    item.onSaved(updated).then(() => resolve(item));
                };
            });
        }

        async saveList(items: Array<T>): Promise<Array<T>> {
            var result: Array<T> = [];
            return new Promise<Array<T>>(async (resolve, reject) => {
                for (var item of items) {
                    var updated = !item.isNew;

                    await item.onValidating();
                    await item.validate();
                    await item.onSaving();

                    var transaction = this.database.db.transaction(this.tableName, "readwrite");
                    var store = transaction.objectStore(this.tableName);

                    store.put(item);
                    transaction.oncomplete = () => {
                        item.onSaved(updated).then(() => {
                            result.push(item);
                        });
                    };
                }
                resolve(result);
            });

        }

        async delete(item: T): Promise<void> {

            await item.onDeleting();

            var transaction = this.database.db.transaction(this.tableName, "readwrite");
            var store = transaction.objectStore(this.tableName);

            return new Promise<void>((resolve, reject) => {
                store.delete(item.id);
                transaction.oncomplete = () => {
                    item.onDeleted().then(() => resolve());
                };
            });
        }
    }
}