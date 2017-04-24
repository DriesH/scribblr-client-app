import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';



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

    currentStep = 1;
    isShowingPassword = false;

    constructor() { }

    ngOnInit() {
    }

    onRegister() {
        this.registerEvent.emit(this.formModel);
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
        switch (this.currentStep) {
            case 1:
                if (this.formModel.fullname !== '') {
                    this.currentStep = step;
                }
                break;
            case 2:
                if (this.formModel.fullname !== '') {
                    this.currentStep = step;
                }
                break;
            case 3:
                if (this.formModel.fullname !== '') {
                    this.currentStep = step;
                }
                break;
            default:
                this.currentStep = 1;
        }
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
