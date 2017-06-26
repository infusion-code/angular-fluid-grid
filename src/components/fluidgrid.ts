import { Component, Input, ContentChild, TemplateRef,
     EventEmitter, Output, ElementRef } from '@angular/core';
import { IFluidGridConfig } from '../interfaces/IFluidGridConfig';

/**
 * This component implements the single row which can be used in tables.
 * @class
 */
@Component({
    selector: 'fuild-grid',
    templateUrl: './fluidgrid.html',
  //  styleUrls: [ './fluidgrid.css'   ]
})
export class FluidGridComponent   {

    private  _activeIndex: number = -1;
    private _config: IFluidGridConfig;

    @ContentChild(TemplateRef)
    private templateRef: TemplateRef<any>;

    private get ReduceToColumn(): number {
        return this._config.ReduceTebleFromWidth && this._elementRef.nativeElement && 
            this._elementRef.nativeElement.firstChild.offsetWidth < this._config.ReduceTebleFromWidth
            ? this._config.ReducedSize : 10000;
    }

    @Input()
    public set ActiveIndex(val: number) { this._activeIndex = val; }
    public get ActiveIndex(): number {  return this._activeIndex; }

    @Input()
    public set Configuration(val: IFluidGridConfig) { this._config = val; }
    public get Configuration(): IFluidGridConfig { return this._config; }

    @Output()
    public OnHighLight: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public OnClick: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _elementRef: ElementRef) {  }

    private FireHighlight(item: any, index: number) {
        if (!item)
        {
            this._activeIndex = -1;
            return;
        }
        this._activeIndex = index;
        this.OnHighLight.emit(item);
    }

    private FireClick(item: any) {

        this.OnClick.emit(item);
    }

}