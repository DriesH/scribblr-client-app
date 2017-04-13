import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';


import { RegisterService } from '../../../services/register.service';
import { JWTTokenService } from '../../../services/jwttoken.service';


@Component({
    selector: 'scrblr-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
    animations: [

    ]
})
export class RegistrationFormComponent implements OnInit {

    @ViewChild('passwordInput') passwordInput: any;

    formModel = {
        fullname: '',
        email: '',
        password: ''
    };
    hasError = false;
    errorMessage = '';

    currentStep = 1;
    isShowingPassword = false;

    constructor(private _rs: RegisterService,
        private _jwt: JWTTokenService,
        private router: Router) { }

    ngOnInit() {
    }

    nextStep(e) {
        e.preventDefault();

        switch (this.currentStep) {
            case 1:
                if (this.formModel.fullname !== '') {
                    this.currentStep++;
                }
                break;

            case 2:
                if (this.formModel.email !== '') {
                    this.currentStep++;
                }
                break;
            case 3:
                if (this.formModel.password !== '') {
                    this.currentStep++;
                }
                break;
            default:
                this.currentStep++;
        }
    }

    changeToStep(step) {
        this.currentStep = step;
    }

    showPassword() {
        this.isShowingPassword = !this.isShowingPassword;

        if (this.isShowingPassword) {
            this.passwordInput.nativeElement.type = 'text';
        } else {
            this.passwordInput.nativeElement.type = 'password';
        }
    }

    onRegister(formModel) {
        this._rs.registerUser(formModel)
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
            }, error => {
                this.onError(error);
            });
    }

    private onError(error) {
        this.hasError = true;
        this.errorMessage = 'error'; // TODO: just for testing.
    }
}
