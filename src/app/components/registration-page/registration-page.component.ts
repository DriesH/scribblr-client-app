import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'scrblr-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.auth.getUser();
    }

}
