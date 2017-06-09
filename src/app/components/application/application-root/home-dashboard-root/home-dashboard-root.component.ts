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
    quickStartActive = false;

    children = [];

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            console.log('children state changed home dashboord', CURRENT_CHILDREN);

            if (CURRENT_CHILDREN.receivedCall) {
                if (CURRENT_CHILDREN.children.length > 0) {
                    this.children = CURRENT_CHILDREN.children;
                    this.noChildren = false;
                    this.quickStartActive = false;
                } else {
                    console.log('quickstart active no children');
                    this.noChildren = true;
                    this.quickStartActive = true;
                }
            }
        });
    }

    doneLoading() {
        this.isLoading = false;
    }

}
