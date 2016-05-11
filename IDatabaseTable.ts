namespace MSharp {
    export interface IDatabaseTable {
        table: string;
        type: string;
        sortable?: boolean;
		indexColumns?: Array<string>;
    }
}