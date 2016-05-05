interface Window { IDBTransaction: IDBTransaction; }
interface EventTarget { error: string }

namespace MSharp {

    export class IndexedDbProvider {

        openRequest: IDBOpenDBRequest;
        db: IDBDatabase;
        dbStructure: Array<IDatabaseTable>;
        schemaVersion: number;

        async open(): Promise<IDBDatabase> {

            return new Promise<IDBDatabase>((resolve, reject) => {

                if (!window.indexedDB) { alert("Your browser doesn't support IndexedDB."); return; }

                this.openRequest = window.indexedDB.open("AppDatabase", this.schemaVersion);

                this.openRequest.onerror = e => {
                    var error = "Failed to open indexedDB database of AppDatabase: " + e.target.error;
                    console.log(e); reject(error);
                };

                this.openRequest.onsuccess = e => this.databaseOpened(e, resolve, reject);

                this.openRequest.onupgradeneeded = e => this.onUpgradeNeeded(e, resolve);
            });
        }

        databaseOpened(e: Event, resolve: (value: IDBDatabase) => void, reject: (reason: any) => void) {
            this.db = this.openRequest.result;

            this.db.onerror = ev => {
                var error = "Database error: " + (<any>ev.target).errorCode;
                console.error(error); console.log(ev); reject(error);
            };

            if (this.db.version == this.schemaVersion) resolve(this.db);
        }

        onUpgradeNeeded(event: IDBVersionChangeEvent, resolve: (value: IDBDatabase) => void) {

            this.db = this.openRequest.result;

            for (var table of this.dbStructure) {

                var store = this.db.createObjectStore(table.tableName, { keyPath: "id" });

                if (table.indexColumns)
                    for (var column of table.indexColumns) {
                        store.createIndex(column, column, { unique: false });
                    }

                store.transaction.oncomplete = ev => {
                    resolve(this.db);
                }
            }
        }
    }
}