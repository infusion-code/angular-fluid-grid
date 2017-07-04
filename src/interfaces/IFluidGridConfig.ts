import { EventEmitter } from '@angular/core';

/**
 * Interface defining the contract for a fluid grid configuration object.
 * @interface
 */
export interface IFluidGridConfig
{
    /**
     * Id of the Grid to configure. 
     * @type {string}
     * @memberof IFluidGridConfig
     */
    GridId?: string;

    /**
     * An array of string containing the header labels for the table. 
     * @type {Array<string>}
     * @memberof IFluidGridConfig
     */
    Headers:  Array<string>;

    /**
     * An array containing the table rows. 
     * @type {Array<*>}
     * @memberof IFluidGridConfig
     */    
    Rows: Array<any>;

    /**
     * Specifies a cutoff size from which on to reduce the table. 
     * @type {number}
     * @memberof IFluidGridConfig
     */
    ReduceTableFromWidth?: number;
    
    /**
     * Specifies the number of colums to show in reduced size.
     * @type {number}
     * @memberof IFluidGridConfig
     */ 
    ReducedSize?: number;
    
    /**
     * An array holding the indicies of the columns currently visible.
     * @type {Array<number>}
     * @memberof IFluidGridConfig
     */
    VisibleColumnIndexes?:  Array<number>;
    
    /**
     * True to make rows clickable.
     * @type {boolean}
     * @memberof IFluidGridConfig
     */   
    IsClickable?: boolean;

    /**
     * The number of items per page to display. If not specified, teh
     * default value is 10.
     * @type {number}
     * @memberof IFluidGridConfig
     */
    ItemsPerPage?: number;
}
