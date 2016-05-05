namespace MSharp {
    export class BaseDatabase {

        db: IDBDatabase;

        /** Specifies the current version of the database schema.
        * Increment this in App.ts for every new release with a changed schema
        * This allows the installed application database to be upgraded. */
        schemaVersion: number;

        async  initialize(dbStructure: Array<IDatabaseTable>): Promise<void> {
            var provider = new MSharp.IndexedDbProvider();
            provider.schemaVersion = this.schemaVersion;
            provider.dbStructure = dbStructure;

            this.db = await provider.open();
        }
    }
}