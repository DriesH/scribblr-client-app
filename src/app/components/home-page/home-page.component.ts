import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss', './home.media.scss', './home-page.keyframes.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

    isLoggedIn = false;
    showBooks = false;

    @ViewChild('bookSection') bookSection: ElementRef;

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
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
        document.addEventListener('scroll', this.showBooksFn.bind(this));
    }

    removeEventListeners() {
        document.removeEventListener('scroll', this.showBooksFn.bind(this));
    }

    showBooksFn(e) {
        if (this.bookSection.nativeElement.getBoundingClientRect().top <= 400) {
            this.showBooks = true;
        } else {
            this.showBooks = false;
        }
    }
}
