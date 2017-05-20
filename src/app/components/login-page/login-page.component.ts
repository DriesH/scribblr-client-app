import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';

import { Options } from 'angular2-notifications';

@Component({
    selector: 'scrblr-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    _config: Options = {
        position: ['top', 'left'],
        timeOut: 4000,
        animate: 'fromRight'
    };


    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.auth.getUser();
        });
    }
}
