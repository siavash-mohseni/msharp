namespace MSharp {

    export interface IDatabaseTable {
        table: string;
        type: string;
        sortable?: boolean;
    }

    export class DatabaseTable<T extends Entity> {

        table: string;
        type: string;
        sortable: boolean;

        constructor(public database: BaseDatabase, info: IDatabaseTable) {
            this.table = info.table;
            this.type = info.type;
            this.sortable = info.sortable || false;
        }

        async getList(criteria: (item: T) => boolean = null): Promise<Array<T>> {
            var transaction = this.database.db.transaction(this.table, "readonly");
            var store = transaction.objectStore(this.table);

            return new Promise<Array<T>>((resolve, reject) => {
                var request = store.openCursor();

                var result: Array<T> = [];

                request.onsuccess = () => {

                    if (request.result) {

                        var cursor = request.result;
                        if (cursor) {

                            var item: T = new window["Domain"][this.type](cursor.value);

                            if (!criteria || criteria(item)) {
                                item.isNew = false;
                                result.push(item);
                            }
                            cursor.continue();
                        }
                    }
                    else {

                        if (this.sortable) result.sort((a, b) => a.compareTo(b));

                        resolve(result);
                    }
                };
                request.onerror = e => { reject(e.target.error); };
            });
        }

        async get(id: string): Promise<T> {
            if (!id)
                return null;

            var transaction = this.database.db.transaction(this.table, "readonly");
            var store = transaction.objectStore(this.table);

            return new Promise<T>((resolve, reject) => {
                var request = store.get(id);
                request.onsuccess = () => {
                    if (request.result) {
                        var data = request.result;
                        data.IsNew = false;

                        var result = new window["Domain"][this.type](data);

                        resolve(result);
                    }
                    else {
                        reject("Could not find a record in the table " + this.table + " with the id: " + id);
                    }
                };
                request.onerror = e => { reject(e.target.error); };
            });
        }

        async find(criteria: (item: T) => boolean): Promise<T> {
            var transaction = this.database.db.transaction(this.table, "readonly");
            var store = transaction.objectStore(this.table);

            return new Promise<T>((resolve, reject) => {
                var request = store.openCursor();

                var result: T = null;

                request.onsuccess = () => {

                    if (request.result) {

                        var cursor = request.result;
                        if (cursor) {

                            var item: T = new window["Domain"][this.type](cursor.value);

                            if (!criteria || criteria(item)) {
                                item.isNew = false;
                                result = item;
                                resolve(result);
                                return;
                            }
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

        async any(criteria: (item: T) => boolean): Promise<boolean> {
            var transaction = this.database.db.transaction(this.table, "readonly");
            var store = transaction.objectStore(this.table);

            return new Promise<boolean>((resolve, reject) => {
                var request = store.openCursor();

                var result: boolean = false;

                request.onsuccess = () => {

                    if (request.result) {

                        var cursor = request.result;
                        if (cursor) {

                            var item: T = new window["Domain"][this.type](cursor.value);

                            if (!criteria || criteria(item)) {
                                result = true;
                                resolve(result);
                                return;
                            }
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

        async none(criteria: (item: T) => boolean): Promise<boolean> {
            return !(await this.any(criteria));
        }

        async save(item: T): Promise<T> {

            var updated = !item.isNew;

            await item.onValidating();
            var validatoinResult = new ValidationResult();
            await item.validate(validatoinResult);
            if (validatoinResult.any()) {
                throw new ValidationError(validatoinResult);
            }
            await item.onSaving();

            var transaction = this.database.db.transaction(this.table, "readwrite");
            var store = transaction.objectStore(this.table);

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
                    var validatoinResult = new ValidationResult();
                    await item.validate(validatoinResult);
                    if (validatoinResult.any()) {
                        throw new ValidationError(validatoinResult);
                    }
                    await item.onSaving();

                    var transaction = this.database.db.transaction(this.table, "readwrite");
                    var store = transaction.objectStore(this.table);

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

            var transaction = this.database.db.transaction(this.table, "readwrite");
            var store = transaction.objectStore(this.table);

            return new Promise<void>((resolve, reject) => {
                store.delete(item.id);
                transaction.oncomplete = () => {
                    item.onDeleted().then(() => resolve());
                };
            });
        }

        async deleteWhere(criteria: (item: T) => boolean = null): Promise<void> {
            if (!criteria)
                return;

            var transaction = this.database.db.transaction(this.table, "readwrite");
            var store = transaction.objectStore(this.table);

            return new Promise<void>((resolve, reject) => {
                var request = store.openCursor();

                request.onsuccess = () => {

                    if (request.result) {

                        var cursor = request.result;
                        if (cursor) {

                            var item: T = new window["Domain"][this.type](cursor.value);

                            if (criteria(item)) {
                                store.delete(item.id);
                                transaction.oncomplete = () => {
                                    item.onDeleted();
                                };
                            }
                            cursor.continue();
                        }
                    }
                    else {
                        resolve();
                    }
                };
                request.onerror = e => { reject(e.target.error); };
            });
        }
    }
}