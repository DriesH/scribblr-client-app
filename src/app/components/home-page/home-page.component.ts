import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss', './home.media.scss']
})
export class HomePageComponent implements OnInit {

    isLoggedIn = false;

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            let currentUser: any = CURRENT_USER;

            if (currentUser.isAuth) {
                this.isLoggedIn = true;
            }

            this.auth.getUser();
        });
    }


}
