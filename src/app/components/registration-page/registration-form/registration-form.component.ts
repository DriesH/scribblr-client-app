import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../../../services/register.service';
import { HttpHelperService } from '../../../services/http-helper.service';
import { JWTTokenService } from '../../../services/jwttoken.service';

import { Router } from '@angular/router';

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
            this._jwt.storeToken(res.token)
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
