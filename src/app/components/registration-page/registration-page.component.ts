import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';

import { Options } from 'angular2-notifications';

@Component({
    selector: 'scrblr-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: [
        './registration-page.component.scss',
        './register-mobile.scss'
    ]
})

export class RegistrationPageComponent implements OnInit {

    _config: Options = {
        position: ['top', 'left'],
        timeOut: 4000,
        animate: 'fromRight'
    };

    constructor(
        private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.auth.getUser();
        });
    }
}
