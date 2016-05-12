import {Page, Events, NavController, Platform, NavParams, NavOptions} from 'ionic-angular';
import './NavController';
import {ValidationMessage} from 'msharp';

export class BaseComponent {
    user: Domain.User;
    formValidations: Array<MSharp.ResultError> = [];
    validationMessages: Array<ValidationMessage> = [];
    self: BaseComponent;

    constructor(public platform: Platform, public events: Events, public nav: NavController, public params: NavParams) {
        this.self = this;
        window.params = this.params;
        window.events = this.events;

        this.events.subscribe('Refresh', async () => {
            await this.ngOnInit();
        });
    }

    registerValidationMessage(message: ValidationMessage) {
        this.validationMessages.push(message);
    }

    isValid(validation: MSharp.ValidationResult): boolean {
        if (!validation || !validation.errors || validation.errors.length == 0) return true;
        this.validationMessages.forEach(m => m.display(validation));
        return false;
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