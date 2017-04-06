import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

import { Store } from '@ngrx/store';
import * as userActions from '../../ngrx-state/actions/current-user.action';

@Component({
    selector: 'scrblr-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    private _token: string;

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        try {
            this._token = localStorage.getItem('_token');
            this.getUser(this._token);
        } catch (e) {
            console.log('No token set in localStorage.');
        }
    }

    private getUser(token) {
        this.auth.getUserData(token)
            .subscribe(res => {
                this.addUserToState(res.user);
            }, error => {

            });
    }

    private addUserToState(user: User) {
        this.store.dispatch({ type: userActions.ActionTypes.SUCCES_LOGIN, payload: user });
    }
}
