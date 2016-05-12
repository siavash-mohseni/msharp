import {Component, Input, Output, EventEmitter, } from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {BaseComponent} from 'msharp';

@Component({
    selector: 'validation-message',
    directives: [IONIC_DIRECTIVES],
    template: `<div *ngIf="message" class="has-error">
                    * {{ message }} 
               </div>`
})
export class ValidationMessage {

    @Input() property: string;
    @Input() form: BaseComponent;

    message: string = "";

    display(validation: MSharp.ValidationResult): void {
        this.message = validation ? validation.errors.filter(e => e.propertyName == this.property).join('<br/>* ') : "";
    }

    ngOnInit() { this.form.validationMessages.push(this); }
}
