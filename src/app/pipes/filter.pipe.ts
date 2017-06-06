import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPosts',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items) {
            return items;
        }

        if (filter === undefined || filter === null) {
            return items;
        }

        return items.filter(item => {
            if (filter.is_memory !== null) {
                if (item.is_memory === filter.is_memory) {
                    return item;
                }
            } else if (filter.afterDate) {
                if (item.created_at >= filter.afterDate) {
                    return item;
                }
            } else if (filter.beforeDate) {
                if (item.created_at <= filter.beforeDate) {
                    return item;
                }
            }
        });
    }
}
