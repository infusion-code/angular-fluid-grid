import { EventEmitter } from '@angular/core';
export interface IFluidGridConfig
{
    GridId?: string,
    Headers:  Array<string>;
    Rows: Array<any>;
    ReduceTebleFromWidth?: number;
    ReducedSize?: number;
    VisibleColumnIndexes?:  Array<number>;
    IsClicable?: boolean;
    ItemsPerPage?: number;
}
