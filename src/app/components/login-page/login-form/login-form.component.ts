import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { JWTTokenService } from '../../../services/jwttoken.service';

import { User } from '../../../models/user';

import { Store } from '@ngrx/store';
import * as userActions from '../../../ngrx-state/actions/current-user.action';

@Component({
    selector: 'scrblr-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    formModel: any = {};
    hasError = false;
    errorMessage = '';

    constructor(private _auth: AuthService,
        private _jwt: JWTTokenService,
        private router: Router,
        private store: Store<any>) { }

    ngOnInit() {
    }

    onLogin(formData) {
        this._auth.authenticateUser(formData)
            .subscribe(res => {
                this.addUserToState(res.user);

                this._jwt.setToken(res.user.JWTToken)
                    .then(success => {
                        if (this.hasError) {
                            this.hasError = false;
                        }

                        this.router.navigate(['/home']);
                    })
                    .catch(error => {
                        this.onError(error);
                    });
            }, error => {
                this.onError(error);
            });
    }

    private addUserToState(user: User) {
        this.store.dispatch({ type: userActions.ActionTypes.SUCCESS_LOGIN, payload: user });
    }

    // TODO: move this to a state in ngrx.
    private onError(error) {
        this.hasError = true;
        this.errorMessage = 'error';
    }
}
