declare namespace MSharp {
    class BaseDatabase {
        structure: Array<IDatabaseTable>;
        db: IDBDatabase;
        /** Specifies the current version of the database schema.
        * Increment this in App.ts for every new release with a changed schema
        * This allows the installed application database to be upgraded. */
        schemaVersion: number;
        initialize(structure: Array<IDatabaseTable>): Promise<void>;
        getTable<T extends Entity>(table: string): MSharp.DatabaseTable<T>;
    }
}

declare namespace MSharp {
    class DatabaseTable<T extends Entity> {
        database: BaseDatabase;
        table: string;
        type: string;
        sortable: boolean;
        constructor(database: BaseDatabase, info: IDatabaseTable);
        getList(criteria?: (item: T) => boolean): Promise<Array<T>>;
        get(id: string): Promise<T>;
        find(criteria: (item: T) => boolean): Promise<T>;
        any(criteria: (item: T) => boolean): Promise<boolean>;
        none(criteria: (item: T) => boolean): Promise<boolean>;
        save(item: T): Promise<T>;
        saveList(items: Array<T>): Promise<Array<T>>;
        delete(item: T): Promise<void>;
        deleteWhere(criteria?: (item: T) => boolean): Promise<void>;
    }
}

declare namespace MSharp {
    class Entity {
        constructor(data?: any);
        isNew: boolean;
        id: string;
        state: EntityState;
        onValidating(): Promise<void>;
        validate(result: ValidationResult): Promise<void>;
        onSaving(): Promise<void>;
        onSaved(updated: boolean): Promise<void>;
        onDeleting(): Promise<void>;
        onDeleted(): Promise<void>;
        copyDataTo(to: Object): Promise<void>;
        toString(): string;
        compareTo(other: Entity): number;
    }
    enum EntityState {
        New = 0,
        Edited = 1,
        Deleted = 2,
    }
}

interface Array<T> {
    sum(): number;
    contains(item: any, compareProperty?: string): boolean;
    first(change?: (item: T) => boolean): T;
    where(criteria: (item: T) => boolean): Array<T>;
    removeNulls(): Array<T>;
    any(change?: (item: T) => boolean): boolean;
    none(change?: (item: T) => boolean): boolean;
    pushRange(...arrays: Array<T>[]): void;
    remove(item: T): Array<T>;
    except(item: T): Array<T>;
    selectMany(fn: Function): Array<any>;
    orderBy(criteria: (item: T) => any): Array<T>;
    orderByDescending(criteria: (item: T) => any): Array<T>;
}
interface Date {
    toDateTimeString(): string;
    toDate(): string;
    toTime(): string;
}
declare function datePadding(s: any): any;
interface Window {
    newGuid(): string;
    events: any;
    params: any;
    viewController: any;
}
interface String {
    contains(term: string, caseSensitive: boolean): boolean;
    isEmpty(): boolean;
    hasValue(): boolean;
    toHtmlLines(): string;
    formatWith(...values: any[]): string;
}

declare namespace MSharp {
    interface IDatabaseTable {
        table: string;
        type: string;
        sortable?: boolean;
        indexColumns?: Array<string>;
    }
}

declare namespace MSharp {
    interface IHierarchy {
        getParent?(): IHierarchy;
        getFullPath?(node?: IHierarchy): string;
        getAllChildren?(): Array<IHierarchy>;
        getChildren?(): Array<IHierarchy>;
        withAllParents?(): Array<IHierarchy>;
        getAllParents?(): Array<IHierarchy>;
        withAllChildren?(): Array<IHierarchy>;
        name?: string;
    }
    class Heirarchy {
        static extend(type: any): void;
    }
}

interface Window {
    IDBTransaction: IDBTransaction;
}
interface EventTarget {
    error: string;
}
declare namespace MSharp {
    class IndexedDbProvider {
        openRequest: IDBOpenDBRequest;
        db: IDBDatabase;
        dbStructure: Array<IDatabaseTable>;
        schemaVersion: number;
        open(): Promise<IDBDatabase>;
        databaseOpened(e: Event, resolve: (value: IDBDatabase) => void, reject: (reason: any) => void): void;
        onUpgradeNeeded(event: IDBVersionChangeEvent, resolve: (value: IDBDatabase) => void): void;
    }
}

declare namespace MSharp {
    interface ISortable {
        order?: number;
    }
    class Sortable {
        static extend(type: any): void;
    }
}

declare namespace MSharp {
    class MenuItem {
        title: string;
        icon: string;
        page: any;
        constructor(title: string, icon: string, page: any);
    }
}

declare class SelectListItem {
    constructor(text?: string, value?: string);
    text: string;
    value: string;
    isChecked: boolean;
    toString(): string;
    static fromList(list: Array<any>): Array<SelectListItem>;
}

declare namespace MSharp {
    class ResultError {
        message: string;
        propertyName: string;
        constructor(message: string, propertyName?: string);
        toString(): string;
    }
    class ValidationResult {
        errors: Array<ResultError>;
        add(errorMessage: any, propertyName?: any): void;
        any(): boolean;
        toString(): string;
    }
    class ValidationError extends Error {
        validation: ValidationResult;
        constructor(validation?: ValidationResult);
    }
}
