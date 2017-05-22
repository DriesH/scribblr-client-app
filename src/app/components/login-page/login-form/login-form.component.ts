import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { JWTTokenService } from '../../../services/jwttoken.service';

import { User } from '../../../models/user';

import { Store } from '@ngrx/store';
import * as userActions from '../../../ngrx-state/actions/current-user.action';


@Component({
    selector: 'scrblr-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: [
        './login-form.component.scss'
    ]
})
export class LoginFormComponent implements OnInit {

    @ViewChild('passwordInput') passwordInput: any;

    formModel: any = {};
    hasError = false;
    errorMessage = '';

    isShowingPassword = false;



    constructor(private _auth: AuthService,
        private _jwt: JWTTokenService,
        private router: Router,
        private store: Store<any>) { }

    ngOnInit() {
    }

    showPassword() {
        this.isShowingPassword = !this.isShowingPassword;

        if (this.isShowingPassword) {
            this.passwordInput.nativeElement.type = 'text';
        } else {
            this.passwordInput.nativeElement.type = 'password';
        }
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
                        console.log(error);
                    });
            });
    }

    private addUserToState(user: User) {
        this.store.dispatch(new userActions.SuccessfullLogin(user));
    }
}
