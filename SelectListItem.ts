class SelectListItem {
    constructor(text?: string, value?: string) {
        this.text = text;
        this.value = value;
    }

    public text: string;
    public value: string;
    public isChecked: boolean;

    toString(): string {
        return this.text;
    }

    static fromList(list: Array<any>): Array<SelectListItem> {
        var selectListItems: Array<SelectListItem> = [];
        for (var item of list) {
            if (item instanceof MSharp.Entity)
                selectListItems.push(new SelectListItem(item.toString(), item.id));
            else if (item instanceof SelectListItem)
                selectListItems.push(item);
            else
                selectListItems.push(new SelectListItem(item.toString(), item.toString()));
        }
        return selectListItems;
    }
}