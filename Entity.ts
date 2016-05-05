namespace MSharp {

    export class Entity {

        constructor(data: any = {}) {
            this.id = (data && data.id) ? data.id : window.newGuid();
            this.isNew = (data && data.id) ? false : true;
        }

        public isNew: boolean;

        public id: string;

        public state: EntityState;

        async onValidating(): Promise<void> { console.log('base validating'); }

        async validate(): Promise<void> { console.log('base validate'); }

        async onSaving(): Promise<void> { console.log('base onSaving'); }

        async onSaved(updated: boolean): Promise<void> { console.log('base onSaved'); }

        async onDeleting(): Promise<void> { console.log('base onDeleting'); }

        async onDeleted(): Promise<void> { console.log('base onDeleted'); }

        async copyDataTo(to: Object): Promise<void> {
            if (to)
                for (var property in this)
                    if (this.hasOwnProperty(property) && to.hasOwnProperty(property))
                        to[property] = this[property];
        }

        toString(): string { return '' };
    }

    export enum EntityState {
        New,
        Edited,
        Deleted,
    }
}
