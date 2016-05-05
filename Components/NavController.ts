import {Type} from 'angular2/core';
import {NavOptions, Alert, Modal, ViewController} from 'ionic-angular';
import {NavController} from './../../../node_modules/ionic-angular/components/nav/nav-controller';

export interface PromptInputOptions {
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    id?: string;
}

//NavController Augmentation
declare module './../../../node_modules/ionic-angular/components/nav/nav-controller' {
    interface NavController {
        //Adding extentions to NacController prototype
        back(opts?: NavOptions): Promise<any>;
        backTo(page: Type, opts?: NavOptions): Promise<any>;
        forward(page: Type, params?: any, opts?: NavOptions): Promise<any>;
        popup(page: Type, params?: any): Promise<any>;
        dismiss(data?: any): Promise<any>;
        currentPage(): ViewController;
        currentParam(paramName: string): any;
        alert(message: string): void;
        confirm(message: string): Promise<boolean>;
        prompt(title: string, message: string, saveText: string, saveHandler: Function, cancelText: string, cancelHandler: Function, inputs: Array<PromptInputOptions>): void;
    }
}

//back: pop and refresh
NavController.prototype.back = function (): Promise<any> {
    window.events.publish('Refresh');
    return this.pop();
}

//back: pop and refresh
NavController.prototype.backTo = function (page: Type, opts?: NavOptions): Promise<any> {
    window.events.publish('Refresh');
    return this.popTo(page, opts);
}

//forward: push to page
NavController.prototype.forward = function (page: Type, params?: any, opts?: NavOptions): Promise<any> {
    return this.push(page, params, opts);
}

//popou: open and creates a modal
NavController.prototype.popup = function (viewController: Type, params?: any): Promise<any> {
    let modal = Modal.create(viewController, params);
    return this.present(modal);
}

//dismiss: closes a modal and send the data to the parent if available
NavController.prototype.dismiss = function (data: any): Promise<any> {
    window.events.publish('Refresh');
    return window.viewController.dismiss(data);
}


//currentPage: gets the current page ViewController
NavController.prototype.currentPage = function (): any {
    return this.getActive();
}

//currentPage: gets the current page Parameters
NavController.prototype.currentParam = function (paramName: string): any {
    return window.params.get(paramName);
}

//alert
NavController.prototype.alert = function (message: string): void {
    let alert = Alert.create({
        message: message,
        buttons: ['OK']
    });
    this.present(alert);
}

//confirm
NavController.prototype.confirm = function (message: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        let confirm = Alert.create({
            message: message,
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        resolve(true);
                    }
                },
                {
                    text: "Cancel",
                    handler: () => {
                        resolve(false);
                    }
                }
            ]
        });
        await this.present(confirm);
    });
}

//prompt
NavController.prototype.prompt = function (
    title: string,
    message: string,
    saveText: string,
    saveHandler: Function,
    cancelText: string,
    cancelHandler: Function,
    inputs: Array<PromptInputOptions>
): void {
    let confirm = Alert.create({
        title: title,
        message: message,
        inputs: inputs,
        buttons: [
            {
                text: saveText,
                handler: saveHandler
            },
            {
                text: cancelText,
                handler: cancelHandler
            }
        ]
    });
    this.present(confirm);
}



