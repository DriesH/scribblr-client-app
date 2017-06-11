import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth.service';
import { RegisterService } from '../../../services/register.service';
import { JWTTokenService } from '../../../services/jwttoken.service';
import { Router } from '@angular/router';


const errorTypes = {
    VALIDATION: 'validation',
};


@Component({
    selector: 'scrblr-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
    animations: [

    ]
})
export class RegistrationFormComponent implements OnInit {

    @ViewChild('passwordInput') passwordInput: any;

    @Output() registerEvent: EventEmitter<Object> = new EventEmitter();

    formModel = {
        fullname: '',
        email: '',
        password: ''
    };

    isShowingPassword = false;

    buttonLoadingAnim = false;

    constructor(private _auth: AuthService,
        private _rs: RegisterService,
        private _jwt: JWTTokenService,
        private router: Router,
        private store: Store<any>) { }

    ngOnInit() {
        this.store.select('APPLICATION_UI').subscribe((APPLICATION_UI: any) => {
            if (APPLICATION_UI.error.type === errorTypes.VALIDATION) {
                this.buttonLoadingAnim = false;
            }
        });
    }

    onRegister(formModel) {
        this.buttonLoadingAnim = true;
        this._rs.registerUser(formModel).subscribe(res => {
            if (res.success) {
                this._jwt.setToken(res.token)
                    .then(success => {
                        this.router.navigate(['/application']);
                    })
                    .catch(error => {
                        // console.log(error);
                    });
            } else {
                // console.log(res);
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
}
