namespace MSharp {
    export interface IDatabaseTable {
        tableName: string;
        indexColumns?: Array<string>;        
    }
}