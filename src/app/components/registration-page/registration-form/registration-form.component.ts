import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../../services/register.service';
import { JWTTokenService } from '../../../services/jwttoken.service';


@Component({
    selector: 'scrblr-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

    formModel: any = {};
    hasError = false;
    errorMessage = '';

    constructor(private _rs: RegisterService,
        private _jwt: JWTTokenService,
        private router: Router) { }

    ngOnInit() {
    }

    private onRegister(formModel) {
        this._rs.registerUser(formModel).subscribe(res => {
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
