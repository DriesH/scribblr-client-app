import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'childAge'
})
export class ChildAgePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let birthday: any = new Date(value);

        let timeDiff = Math.abs(Date.now() - birthday);
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

        if (age === 1) {
            return age + ' year old';
        }
        return age + ' years old';
    }
}
