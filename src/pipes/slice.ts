
import { PipeTransform, Pipe, Injectable } from '@angular/core';

@Pipe({
    name: 'slice'
})
@Injectable()
export class SlicePipe implements PipeTransform {
    transform(items: any[], size: number): any {
        return items.slice(0, size);
    }
}