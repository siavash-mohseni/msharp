import {Component, Input, Output, EventEmitter, Directive, Provider, forwardRef, ElementRef} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {Camera} from 'ionic-native';

@Component({
    selector: 'file-upload',
    directives: [IONIC_DIRECTIVES],
    template: `
	    <button light small (click)="onChange($event)">Browse</button>
	`
})
export class FileUpload {
    file: Blob = null;

    @Output()
    fileUploadChange: any;

    constructor() {
        this.fileUploadChange = new EventEmitter();
    }

    setValue(value) {
        this.file = value;


    }
    onChange(event) {
        var options = {
            quality: 50,
            destinationType: 1,
            sourceType: 2,
            allowEdit: true,
            encodingType: 0,
            MediaType: 2
        };

        Camera.getPicture(options).then((imageData) => {
            this.fileUploadChange.emit(imageData);
        },
            (err) => {

            });
    }
}

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => FileUploadValueAccessor), multi: true }));

@Directive({
    selector: 'file-upload',
    host: { '(fileUploadChange)': 'onChange($event)' },
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class FileUploadValueAccessor implements ControlValueAccessor {
    onChange = (_) => { };
    onTouched = () => { };

    constructor(private host: FileUpload) { }

    writeValue(value: any): void {
        this.host.setValue(value);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
