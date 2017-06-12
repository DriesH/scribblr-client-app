import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss',
        './home-page.keyframes.scss',
        './intro-section.scss',
        './books.scss',
        './explanation-section.scss',
        './home.media.scss',
    ]
})
export class HomePageComponent implements OnInit, OnDestroy {

    isLoggedIn = false;
    showBooks = false;
    randomImageIndex = 1;

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.randomImageIndex = Math.floor(Math.random() * 3) + 1;
        this.store.select('CURRENT_USER').subscribe((CURRENT_USER: any) => {
            if (CURRENT_USER.isAuth) {
                this.isLoggedIn = true;
            }
            this.auth.getUser();
        });

        this.addEventListeners();
    }

    ngOnDestroy() {
        this.removeEventListeners();
    }

    addEventListeners() {
    }

    removeEventListeners() {
    }
}
