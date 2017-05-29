import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-user-root',
    templateUrl: './user-root.component.html',
    styleUrls: ['./user-root.component.scss']
})
export class UserRootComponent implements OnInit {

    userModel = {
        first_name: null,
        last_name: null,
        email: null,
        street_name: null,
        house_number: null,
        city: null,
        postal_code: null,
        country: null
    };

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            let cu: any = CURRENT_USER;
            this.userModel = cu.user;
        });
    }

    updateUser(userModel) {

    }
}
