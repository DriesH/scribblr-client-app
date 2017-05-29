import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../../services/application-services/user.service';

import * as UserActions from '../../../../ngrx-state/actions/current-user.action';

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

    isActive = false;

    constructor(private store: Store<any>, private _us: UserService) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            let cu: any = CURRENT_USER;
            this.userModel = cu.user;
        });
    }

    updateUser(userModel) {
        console.log('hello', userModel);
        this._us.updateUser(userModel).subscribe(res => {
            this.store.dispatch(new UserActions.UpdateUser({ user: res.user }));
        });
    }


}
