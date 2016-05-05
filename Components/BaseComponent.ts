import {Page, Events, NavController, Platform, NavParams, NavOptions} from 'ionic-angular';
import './NavController';

export class BaseComponent {
    user: Domain.User;
    constructor(public platform: Platform, public events: Events, public nav: NavController, public params: NavParams) {
        window.params = this.params;
        window.events = this.events;

        this.events.subscribe('Refresh', async () => {
            await this.refresh();
        });
    }

    async refresh(): Promise<void> {
    };

    async copyDataTo(to: Object): Promise<void> {
        if (to)
            for (var property in this)
                if (this.hasOwnProperty(property) && to.hasOwnProperty(property))
                    to[property] = this[property];
    }
}