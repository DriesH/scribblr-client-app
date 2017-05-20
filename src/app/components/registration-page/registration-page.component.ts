import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';


import { RegisterService } from '../../services/register.service';
import { JWTTokenService } from '../../services/jwttoken.service';
import { Router } from '@angular/router';

import { Options } from 'angular2-notifications';

@Component({
    selector: 'scrblr-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})

export class RegistrationPageComponent implements OnInit {

    hasError = false;
    errorMessage = '';

    _config: Options = {
        position: ['top', 'left'],
        timeOut: 4000,
        animate: 'fromRight'
    };


    constructor(
        private auth: AuthService, private store: Store<any>,
        private _rs: RegisterService,
        private _jwt: JWTTokenService,
        private router: Router) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.auth.getUser();
        });
    }

    onRegister(formModel) {
        this._rs.registerUser(formModel).subscribe(res => {
            if (res.success) {
                this._jwt.setToken(res.token)
                .then(success => {
                    if (this.hasError) {
                        this.hasError = false;
                    }
                    this.router.navigate(['/home']);
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                console.log(res);
            }
        });
    }
}
