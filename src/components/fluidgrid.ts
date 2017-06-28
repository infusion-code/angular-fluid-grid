import { Component, Input, ContentChild, TemplateRef,
     EventEmitter, Output, ElementRef } from '@angular/core';
import { IFluidGridConfig } from '../interfaces/IFluidGridConfig';

/**
 * This component implements the single row which can be used in tables.
 * @class
 */
@Component({
    selector: 'fluild-grid',
    template: `
      <div class="table-container" [ngStyle]="{'position': false ? 'absolute' : 'static'}">
        <div class="table" (mouseout)="FireHighlight(null)" >
            <div class="table-row no-margin header-row"  >       
                <ng-container *ngFor="let h of (_config.Headers | slice:0:ReduceToColumn); let i=index">
                    <div *ngIf="CheckIfRender(i)" class="cell"  >{{h}}</div>           
                </ng-container>               
            </div>
            <ng-container *ngFor="let r of (_config.Rows | paginate: { itemsPerPage: 10, currentPage: p }); let i=index">
                    <ng-container *ngIf="templateRef">
                        <div class="table-row-group " 
                            [ngClass]='{active: _activeIndex == i, link: _config.IsClickable}' 
                            (mouseover)="FireHighlight(r, i)"
                            (click)="FireClick(r)">
                            <ng-template [ngTemplateOutlet]="templateRef"  [ngOutletContext]="{ item: GenerateRowTemplateModel(r) }" ></ng-template>
                        </div>
                    </ng-container>
                    <ng-container *ngIf="!templateRef">
                        <div class="table-row-group generic" 
                            [ngClass]='{active: _activeIndex == i, link: _config.IsClickable}'  
                            (mouseover)="FireHighlight(r, i)"
                            (click)="FireClick(r)">
                            <div class="table-row no-margin">
                                <ng-container *ngFor="let c of  ( r  |  slice:0:ReduceToColumn ); let i=index">
                                    <div *ngIf="CheckIfRender(i)" class="cell"  >{{c}}</div>           
                                </ng-container>    
                            
                            </div>
                        </div>
                    </ng-container>
            </ng-container>              
        </div>
        <pagination-controls    
            autoHide="true"
            (pageChange)="p = $event">        
        </pagination-controls>
    </div>   
    `,
    styles: [ `
        .table-container {   position: absolute;   max-height: 100%;   overflow: auto;   width: 100%;   padding: 15px; }
        .table {   display: table; }
        .table-row.no-margin {    padding: 3px 6px;   font-size: 1em;   display: table-row; }
        .header-row > .cell {   padding: 5px;   display: table-cell;   font-weight: 400;   color: #727982;   text-align: center; }
        .table-row-group {    display: table-row-group; }
        .table-row-group .generic {   text-align: center; }
        .table-row-group.generic {   text-align: center; }
        :host /deep/  .cell {   padding: 5px;   display: table-cell;   font-weight: 400;   border-bottom: 1px solid #727982; }
        :host /deep/ .cell:hover > .cell {   cursor: default;}
        :host /deep/ .active {   background-color: rgba(255, 255, 255, 0.2); }
        :host /deep/ .link {   cursor: pointer !Important; }
    `]
})
export class FluidGridComponent   {

    ///
    /// Field declarations
    ///
    private  _activeIndex: number = -1;
    private _config: IFluidGridConfig;
    @ContentChild(TemplateRef) private templateRef: TemplateRef<any>;

    ///
    /// Property declarations
    ///

    /**
     * Gets the number to wich to reduce the number of columns to due to sizing constraints.
     * @type {number}
     * @private
     * @property
     * @memberof FluidGridComponent
     */
    private get ReduceToColumn(): number {
        return this._config.ReduceTebleFromWidth && this._elementRef.nativeElement && this._elementRef.nativeElement.children.length &&
            this._elementRef.nativeElement.children[0].offsetWidth < this._config.ReduceTebleFromWidth
            ? this._config.ReducedSize : 10000;
    }

    /**
     * Gets or sets the index of the active row.
     * @type {number}
     * @public
     * @property
     * @memberof FluidGridComponent
     */
    @Input()
    public set ActiveIndex(val: number) { this._activeIndex = val; }
    public get ActiveIndex(): number {  return this._activeIndex; }

    /**
     * Gets or sets configuratio object for the table.
     * @type {IGenericTableConfig}
     * @public
     * @property
     * @memberof FluidGridComponent
     */
    @Input()
    public set Configuration(val: IFluidGridConfig) { this._config = val; }
    public get Configuration(): IFluidGridConfig { return this._config; }

    /**
     * Emits the row which is currently highlighted. 
     * @type {*}
     * @public
     * @event
     * @memberof FluidGridComponent
     */
    @Output()
    public OnHighLight: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Emits the row which is clicked. 
     * @type {*}
     * @public
     * @event
     * @memberof FluidGridComponent
     */
    @Output()
    public OnClick: EventEmitter<any> = new EventEmitter<any>();

    ///
    /// Constructor
    ///

    /**
     * Creates a new instance of the GenericTableComponent.
     * @param {ElementRef} _elementRef - Injected {@link ElementRef} that presents the table in the DOM.
     * @constructor
     * @memberof FluidGridComponent
     */
    constructor(private _elementRef: ElementRef) {}

    ///
    /// Private methods
    ///

    /**
     * Checks if a certain column should be rendered in the current display context.
     * @param {number} index - The index of the column to check.
     * @returns {boolean} - True to render the column, false otherwise. 
     * @private
     * @method
     * @memberof FluidGridComponent
     */
    private CheckIfRender(index: number): boolean {
        return !this._config.VisibleColumnIndexes ||
            this._config.VisibleColumnIndexes.indexOf(index) > -1
    }

    /**
     * Event delegate handling the highlight of a row and emitting the hightlight event of the component. 
     * @param {*} item - The highlighted item.
     * @param {number} index - The index of the highlighted item. 
     * @private
     * @method
     * @memberof FluidGridComponent
     */
    private FireHighlight(item: any, index: number) {
        if (!item) {
            this._activeIndex = -1;
            return;
        }
        this._activeIndex = index;
        this.OnHighLight.emit(item);
    }

    /**
     * Event delegate handling the click on a row and emitting the click event of the component.
     * @param {*} item - The clicked item.
     * @private
     * @method
     * @memberof FluidGridComponent
     */
    private FireClick(item: any) {

        this.OnClick.emit(item);
    }

    /**
     * Generates the template model for a row. 
     * 
     * @private
     * @param {*} row - The row for which to generate the template model.
     * @returns {{   
     *             row: any, 
     *             reduceToColumn: number
     *             visibleColumnIndexes: Array<number>
     *         }} 
     * @method
     * @private
     * @memberof FluidGridComponent
     */
    private GenerateRowTemplateModel(row: any): 
        {   
            row: any, 
            reduceToColumn: number
            visibleColumnIndexes: Array<number>
        } {
        return { 
            row : row,
            reduceToColumn : this.ReduceToColumn,
            visibleColumnIndexes : this._config.VisibleColumnIndexes
     };
    }
}