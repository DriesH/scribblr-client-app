import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

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

    constructor() { }

    ngOnInit() {
    }

    onRegister() {
        this.registerEvent.emit(this.formModel);
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
