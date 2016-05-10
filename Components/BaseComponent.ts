import {Page, Events, NavController, Platform, NavParams, NavOptions} from 'ionic-angular';
import './NavController';

export class BaseComponent {
    user: Domain.User;
    formValidations: Array<MSharp.ResultError> = [];

    constructor(public platform: Platform, public events: Events, public nav: NavController, public params: NavParams) {
        window.params = this.params;
        window.events = this.events;

        this.events.subscribe('Refresh', async () => {
            await this.ngOnInit();
        });
    }

    validationFor(propertyName: string): Array<MSharp.ResultError> {
        return this.formValidations.where(error => error.propertyName == propertyName);
    }

    async ngOnInit(): Promise<void> {
    };

    async copyDataTo(to: Object): Promise<void> {
        if (to)
            for (var property in this)
                if (this.hasOwnProperty(property) && to.hasOwnProperty(property))
                    to[property] = this[property];
    }
}