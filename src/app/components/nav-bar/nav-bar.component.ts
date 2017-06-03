import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss', './nav-bar.media.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit, OnDestroy {

    CURRENT_USER;

    isTop = true;

    constructor(private store: Store<any>) { }

    ngOnInit() {
         this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.CURRENT_USER = CURRENT_USER;
        });

        this.attachEventListeners();
    }

    ngOnDestroy() {
        this.removeEventListeners();
    }

    attachEventListeners() {
        window.addEventListener('scroll', this.makeBgWhite.bind(this), false);
    }

    removeEventListeners() {
        window.removeEventListener('scroll', this.makeBgWhite.bind(this), false);
    }

    makeBgWhite(e) {
         if (window.scrollY === 0) {
            this.isTop = true;
        } else {
            this.isTop = false;
        }
    }
}
