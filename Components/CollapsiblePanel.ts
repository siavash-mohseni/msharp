import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
    selector: 'collapsible-panel',
    directives: [IONIC_DIRECTIVES],
    template: `
                <div class="panel panel-default" [ngClass]="{'panel-open': isOpen}">
                  <div class="panel-heading" (click)="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a href tabindex="0">
                        <ion-icon name="{{icon}}" [hidden]="isOpen"></ion-icon>
                        <ion-icon name="{{iconalt}}" [hidden]="!isOpen"></ion-icon>
                        <span>{{heading}}</span></a>
                    </h4>
                  </div>
                  <div class="panel-collapse" [hidden]="!isOpen">
                    <div class="panel-body">
	                    <ng-content></ng-content>
                    </div>
                  </div>
                </div>
                `
})
export class CollapsiblePanel {
    private _isOpen: boolean = false;

    @Input() heading: string;
    @Input() icon: string;
    @Input() iconalt: string;

    @Input()
    set isOpen(value: boolean) {
        this._isOpen = value;
    }

    get isOpen() {
        return this._isOpen;
    }

    constructor() {
    }

    toggleOpen(event: MouseEvent): void {
        event.preventDefault();
        this.isOpen = !this.isOpen;
    }
}