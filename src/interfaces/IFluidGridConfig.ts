import { EventEmitter } from '@angular/core';
export interface IFluidGridConfig
{
    Headers:  Array<string>;
    Rows: Array<any>;
    ReduceTebleFromWidth?: number;
    ReducedSize?: number;
    IsClicable?: boolean;
}
