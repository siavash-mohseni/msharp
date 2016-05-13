declare class AppDatabase extends MSharp.BaseDatabase {
    contacts: MSharp.DatabaseTable<Domain.Contact>;
    telephones: MSharp.DatabaseTable<Domain.Telephone>;
    users: MSharp.DatabaseTable<Domain.User>;
    genders: MSharp.DatabaseTable<Domain.Gender>;
    groups: MSharp.DatabaseTable<Domain.Group>;
    contactGroups: MSharp.DatabaseTable<Domain.ContactGroup>;
    start(): Promise<void>;
    save(item: MSharp.Entity): Promise<MSharp.Entity>;
    delete(item: MSharp.Entity): Promise<void>;
}

declare var database: AppDatabase;
declare namespace Domain.Base {
    class Group extends MSharp.Entity {
        constructor(data?: IGroup);
        name: string;
        validate(result: MSharp.ValidationResult): Promise<void>;
    }
    class Contact extends MSharp.Entity {
        constructor(data?: IContact);
        firstName: string;
        lastName: string;
        genderId: string;
        isMarried: boolean;
        birthDate: Date;
        avatar: Blob;
        telephones(): Promise<Array<Telephone>>;
        gender(): Promise<Gender>;
        groups(): Promise<Array<ContactGroup>>;
    }
    class ContactGroup extends MSharp.Entity {
        constructor(data?: IContactGroup);
        joinDate: Date;
        groupId: string;
        contactId: string;
    }
    class Telephone extends MSharp.Entity {
        constructor(data?: ITelephone);
        contactId: string;
        number: string;
        contact(): Promise<Contact>;
    }
    class User extends MSharp.Entity {
        constructor(data?: IUser);
    }
    class Gender extends MSharp.Entity {
        constructor(data?: IGender);
        name: string;
    }
}

declare namespace Domain {
    interface IGroup {
        name?: string;
    }
    interface IContact {
        firstName?: string;
        lastName?: string;
        genderId?: string;
        isMarried?: boolean;
        birthDate?: Date;
        avatar: Blob;
        gender(): Promise<IGender>;
        telephones(): Promise<Array<ITelephone>>;
    }
    interface IContactGroup {
        joinDate?: Date;
        groupId?: string;
        contactId?: string;
    }
    interface ITelephone {
        contactId?: string;
        number?: string;
        contact(): Promise<IContact>;
    }
    interface IUser {
    }
    interface IGender {
        name: string;
    }
}

declare namespace Domain {
    class Contact extends Base.Contact {
        toString(): string;
    }
}

declare namespace Domain {
    class ContactGroup extends Base.ContactGroup {
    }
}

declare namespace Domain {
    class Gender extends Base.Gender {
        toString(): string;
    }
}

declare namespace Domain {
    class Group extends Base.Group {
        toString(): string;
    }
}

declare namespace Domain {
    class Telephone extends Base.Telephone {
    }
}

declare namespace Domain {
    class User extends Base.User {
    }
}
