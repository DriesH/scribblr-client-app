import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-home-dashboard-root',
    templateUrl: './home-dashboard-root.component.html',
    styleUrls: ['./home-dashboard-root.component.scss']
})
export class HomeDashboardRootComponent implements OnInit {

    noChildren = false;
    isLoading = true;

    children = [];

    constructor(private store: Store<any>) { }

    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 300);

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            if (CURRENT_CHILDREN.children.length > 0) {
                this.children = CURRENT_CHILDREN.children;
                this.noChildren = false;
            } else {
                this.noChildren = true;
            }
        });
    }
}
