import { NgModule, ModuleWithProviders, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


/** 
 * import module interfaces
 */
import { IFluidGridConfig } from './src/interfaces/IFluidGridConfig';

/**
 * import module components
 */
import { FluidGridComponent } from './src/components/FluidGrid';


/**
 * Create export barrel.
 */
export {
    IFluidGridConfig,
    FluidGridComponent
}


/**
 * Main module for the Angular Fluid Grid.
 * 
 * @export
 * @class FluidGridModule
 */
@NgModule({
    declarations: [
        FluidGridComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule],
    exports: [
        CommonModule,
        FluidGridComponent
    ]
    ///
    /// do not add providers here. Since this is a module, providers are created in the forRoot call. 
    /// this will allow the module to be used in lazy loading situations. 
    ///
})
export class FluidGridModule {

    /**
     * Call this method from the consuming applications root module to create service instances for injection. 
     * Do not call this method from any feature modules. 
     * 
     * @static
     * @returns {ModuleWithProviders} 
     * @memberof FluidGridModule
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FluidGridModule,
            providers: [
                ///
                /// add providers here. 
                ///
            ]
        }
    }
}
