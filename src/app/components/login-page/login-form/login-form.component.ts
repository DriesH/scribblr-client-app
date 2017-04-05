import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { JWTTokenService } from '../../../services/jwttoken.service';

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
        private router: Router) { }

    ngOnInit() {
    }

    onLogin(formData) {
        this._auth.authenticateUser(formData)
            .subscribe(res => {
                 this._jwt.setToken(res.token)
                    .then(success => {
                        if (this.hasError) {
                            this.hasError = false;
                        }

                        this.router.navigate(['/home']);
                    })
                    .catch(error => {
                        this.onError(error);
                    });
            });
    }

    private onError(error) {
        this.hasError = true;
        this.errorMessage = 'error'; // TODO: just for testing.
    }
}
