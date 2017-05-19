import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
    transform(val, args) {
        if (val === undefined) {
            return val;
        }

        if (args === undefined) {
            return val;
        }


        if (val.length > args) {
            return val.substring(0, args) + '...';
        } else {
            return val;
        }
    }
}
