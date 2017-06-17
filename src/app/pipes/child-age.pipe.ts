import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'childAge'
})
export class ChildAgePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let birthday: any = new Date(value);

        let timeDiff = Date.now() - birthday;
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

        if (age === 1) {
            return age + ' year old';
        } else if (age < 1) {
            let months = Math.floor(((timeDiff / (1000 * 3600 * 24)) / 365) * 12);
            if (months === 1) {
                return months + ' month old';
            } else if (months < 1) {
                let weeks = Math.floor(((timeDiff / (1000 * 3600 * 24)) / 365) * 52);
                if (weeks === 1) {
                    return weeks + ' week old';
                } else if (weeks < 1) {
                    let days = Math.floor((timeDiff / (1000 * 3600 * 24)));
                    if (days === 1) {
                        return days + ' day old';
                    } else if (days === 0) {
                        return 'born today';
                    } else if (days < 1) {
                        return '';
                    }
                    return days + ' days old';
                }
                return weeks + ' weeks old';
            }
            return months + ' months old';
        }
        return age + ' years old';
    }
}
