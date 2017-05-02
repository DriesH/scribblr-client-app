import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';


import { RegisterService } from '../../services/register.service';
import { JWTTokenService } from '../../services/jwttoken.service';
import { Router } from '@angular/router';

@Component({
    selector: 'scrblr-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})

export class RegistrationPageComponent implements OnInit {

    hasError = false;
    errorMessage = '';

    constructor(private auth: AuthService, private store: Store<any>,
        private _rs: RegisterService,
        private _jwt: JWTTokenService,
        private router: Router) {
        }

        ngOnInit() {
            this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
                this.auth.getUser();
            });
        }

        onRegister(formModel) {
            this._rs.registerUser(formModel)
            .subscribe(res => {
                if (res.success) {
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
                }
                else {
                    console.log(res);
                }
            }, error => {
                this.onError(error);
            });
        }

        private onError(error) {
            this.hasError = true;
            this.errorMessage = error; // TODO: just for testing.
        }

    }
