import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserService } from '../../../../services/application-services/user.service';

import { NotificationsService } from 'angular2-notifications';

import * as UserActions from '../../../../ngrx-state/actions/current-user.action';

import { Router } from '@angular/router';

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

    countries = [];

    constructor(
        private store: Store<any>,
        private _us: UserService,
        private _ns: NotificationsService,
        private router: Router) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            let cu: any = CURRENT_USER;
            this.userModel = Object.assign({}, this.userModel, cu.user);
        });

        this._us.getCountries().subscribe(res => {
            this.countries = res.countries;
        });
    }

    updateUser(userModel) {
        // console.log('hello', userModel);
        this._us.updateUser(userModel).subscribe(res => {
            // console.log(res);
            this.store.dispatch(new UserActions.UpdateUser({ user: res.user }));
            this._ns.success('Successfully updated your profile!');
            this.router.navigate(['application']);
        });
    }


}
