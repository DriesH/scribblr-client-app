import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';


@Component({
    selector: 'scrblr-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {

    CURRENT_USER;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.CURRENT_USER = CURRENT_USER;
        });
    }

}
