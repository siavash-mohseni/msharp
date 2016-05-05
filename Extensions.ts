interface Array<T> {
    sum(): number;
    contains(item: any, compareProperty?: string): boolean;
    first(change?: (item: T) => boolean): T;
    where(criteria: (item: T) => boolean): Array<T>;
    removeNulls(): Array<T>;
    any(change?: (item: T) => boolean): boolean;
    none(change?: (item: T) => boolean): boolean;
    pushRange(): void;
    remove(item: T): Array<T>;
}

Array.prototype.sum = function () {
    return this.length == 0 ? 0 : this.reduce((prev, cur) => prev + cur);
}

Array.prototype.contains = function (item: any, compareProperty: string = "") {
    if (compareProperty.length > 0 && compareProperty != null) {
        for (var i = 0; i < this.length; i++) {
            if (eval("this[i]." + compareProperty) == eval("item." + compareProperty)) {
                return true;
            }
        }
    }
    else if (typeof item == "object") {
        for (var i = 0; i < this.length; i++) {
            if (this[i].Id == item.Id) return true;
        }
    }
    else {
        for (var i = 0; i < this.length; i++) if (this[i] == item) return true;
    }
    return false;
}

Array.prototype.first = function (change?: (item) => boolean): any {
    if (typeof change === "undefined" || change == null) {
        return this.length > 0 ? this[0] : null;
    }
    for (var i = 0; i < this.length; i++) {
        if (change(this[i])) {
            return this[i];
        }
    }
    return null;
}

Array.prototype.any = function (change?: (item) => boolean): boolean {
    if (typeof change === "undefined" || change == null)
        return this.length > 0;
    for (var i = 0; i < this.length; i++) {
        if (change(this[i])) {
            return true;
        }
    }
    return false;
}

Array.prototype.none = function (change?: (item) => boolean): boolean {
    if (typeof change === "undefined" || change == null)
        return this.length == 0;
    for (var i = 0; i < this.length; i++) {
        if (change(this[i])) {
            return false;
        }
    }
    return true;
}

Array.prototype.where = function (criteria: (item) => boolean): Array<any> {
    var array = new Array();
    if (typeof criteria === 'undefined' || criteria == null)
        return array;

    for (var i = 0; i < this.length; i++) {
        if (criteria(this[i])) {
            array.push(this[i]);
        }
    }
    return array;
}

Array.prototype.removeNulls = function (): Array<any> {
    var array = new Array();
    for (var i = 0; i < this.length; i++) {
        if (typeof this[i] !== "undefined" || this[i] != null) {
            array.push(this[i]);
        }
    }
    return array;
}

Array.prototype.pushRange = function () {
    var toPush = this.concat.apply([], arguments);
    for (var i = 0, len = toPush.length; i < len; ++i) {
        this.push(toPush[i]);
    }
};

Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
    return this;
};


interface Date {
    toDateTimeString(): string;
    toDate(): string;
    toTime(): string;
}

Date.prototype.toDateTimeString = function (): string {
    return datePadding(this.getDate()) + "/" + datePadding(this.getMonth() + 1) + "/" + datePadding(this.getFullYear()) + " " +
        datePadding(this.getHours()) + ":" + datePadding(this.getMinutes()) + ":" + datePadding(this.getSeconds());
}

function datePadding(s) { return (s < 10) ? '0' + s : s; }

Date.prototype.toDate = function (): string {
    return datePadding(this.getDate()) + "/" + datePadding(this.getMonth() + 1) + "/" + datePadding(this.getFullYear());
}

Date.prototype.toTime = function (): string {
    return datePadding(this.getHours()) + ":" + datePadding(this.getMinutes()) + ":" + datePadding(this.getSeconds());
}

Window.prototype["newGuid"] = function (): string {

    var s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toLowerCase();
}
interface Window {
    newGuid(): string;
    events: any;
    params: any;
    viewController: any;
}

interface String {
    contains(term: string, caseSensitive: boolean): boolean;
    isEmpty(): boolean;
    hasValue(): boolean;
}

String.prototype.contains = function (term: string = "", caseSensitive: boolean = true) {
    if (!caseSensitive)
        return (this.toLowerCase().indexOf(term.toLowerCase()) || '') !== -1;
    return (this.indexOf(term) || '') !== -1;
}

//Checks if a string is empty, null or undefined
String.prototype.isEmpty = function () {
    return (!this || 0 === this.length);
}

//Checks if a string is blank or contains only white-space
//Do not check null or undefined values with this
String.prototype.hasValue = function () {
    return !(this.length === 0 || !this.trim());
}