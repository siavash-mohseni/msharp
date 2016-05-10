import {Component, Input, Output, EventEmitter, } from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
    selector: 'validation-message',
    directives: [IONIC_DIRECTIVES],
    template: `
               <div *ngIf="errorString"
                    class="has-error"> * {{ errorString }} </div>
                `
})
export class ValidationMessage {

    @Input() validation: any;
    errorString: string = "";

    ngDoCheck(): void {
        this.errorString = this.validation ? this.validation.join('<br/>* ') : "";
    }

}
