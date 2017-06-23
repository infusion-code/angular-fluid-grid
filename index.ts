import { NgModule, ModuleWithProviders, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 
 * import module interfaces
 */
//import { xxx } from './src/interfaces/xxx';

/** 
 * import module models
 */
//import { xxx } from './src/models/xxx';

/**
 * import module components
 */
//import { xxx } from './src/components/xxx';

/**
 * import module services
 */
//import { xxx } from './src/services/xxx';

/**
 * Create export barrel.
 */
export {
    //xxx
}


/**
 * Main module for the Angular Fluid Grid.
 * 
 * @export
 * @class FluidGridModule
 */
@NgModule({
    declarations: [
    ],
    imports: [CommonModule],
    exports: [
        CommonModule
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
