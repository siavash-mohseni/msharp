import {Page, Events, NavController, Platform, NavParams, NavOptions} from 'ionic-angular';
import {BaseComponent} from './BaseComponent';

export class BasePage extends BaseComponent {
    constructor(platform: Platform, events: Events, nav: NavController, params: NavParams) {
        super(platform, events, nav, params);
    }
}
