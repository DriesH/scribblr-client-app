import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { JWTTokenService } from '../../../services/jwttoken.service';

import { User } from '../../../models/user';

import { Store } from '@ngrx/store';
import * as userActions from '../../../ngrx-state/actions/current-user.action';

const errorTypes = {
    NOT_AUTHENTICATED: 'not_authenticated',
};

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

    isShowingPassword = false;

    buttonLoadingAnim = false;

    constructor(private _auth: AuthService,
        private _jwt: JWTTokenService,
        private router: Router,
        private store: Store<any>) { }

    ngOnInit() {
        this.store.select('APPLICATION_UI').subscribe((APPLICATION_UI: any) => {
            if (APPLICATION_UI.error.type === errorTypes.NOT_AUTHENTICATED) {
                this.buttonLoadingAnim = false;
            }
        });
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
        this.buttonLoadingAnim = true;
        this._auth.authenticateUser(formData)
            .subscribe(res => {
                this.addUserToState(res.user);

                this._jwt.setToken(res.user.JWTToken)
                    .then(success => {

                        this.router.navigate(['/application']);
                    })
                    .catch(error => {
                        // console.log(error);
                    });
            });
    }

    private addUserToState(user: User) {
        this.store.dispatch(new userActions.SuccessfullLogin(user));
    }
}
