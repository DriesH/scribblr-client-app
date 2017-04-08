import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'scrblr-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

    constructor(private auth: AuthService, private store: Store<any>) {
    }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.auth.getUser();
        });
    }

}
