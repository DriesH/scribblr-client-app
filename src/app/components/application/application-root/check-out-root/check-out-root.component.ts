import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { UserService } from '../../../../services/application-services/user.service';

import { CheckOutService } from '../../../../services/application-services/check-out.service';

import * as CartActions from '../../../../ngrx-state/actions/cart.action';

import { NotificationsService } from 'angular2-notifications';
import { NotificationConfig } from '../notifications/config';

interface CurrentUser {
    first_name: string;
    last_name: string;
    street_name: string;
    house_number: string;
    city: string;
    postal_code: string;
    country: string;
};

@Component({
    selector: 'scrblr-check-out-root',
    templateUrl: './check-out-root.component.html',
    styleUrls: ['./check-out-root.component.scss']
})
export class CheckOutRootComponent implements OnInit {

    prices: any = {};
    currentItemsInCart = [];

    totalPrice = 0;

    countries = [];

    currentUserModel: CurrentUser = {
        first_name: null,
        last_name: null,
        street_name: null,
        house_number: null,
        city: null,
        postal_code: null,
        country: null
    };

    isCheckingOut = false;

    _config = NotificationConfig;

    constructor(private store: Store<any>,
        private _cos: CheckOutService,
        private router: Router,
        private location: Location,
        private _us: UserService,
        private _ns: NotificationsService
    ) { }

    ngOnInit() {
        this._cos.getPrices().subscribe(res => {
            this.prices = res;
            this.recalculatePrice();
        });

        this.store.select('CART').subscribe((CART: any) => {
            this.currentItemsInCart = CART.items_in_cart;

            if (!this.currentItemsInCart.length) {
                this.router.navigate(['application', 'home']);
            }
        });

        this.store.select('CURRENT_USER').subscribe((CURRENT_USER: any) => {
            this.currentUserModel.first_name = CURRENT_USER.user.first_name;
            this.currentUserModel.last_name = CURRENT_USER.user.last_name;
            this.currentUserModel.street_name = CURRENT_USER.user.street_name;
            this.currentUserModel.house_number = CURRENT_USER.user.house_number;
            this.currentUserModel.city = CURRENT_USER.user.city;
            this.currentUserModel.postal_code = CURRENT_USER.user.postal_code;
            this.currentUserModel.country = CURRENT_USER.user.country;
        });

        this._us.getCountries().subscribe(res => {
            this.countries = res.countries;
        });
    }

    recalculatePrice() {
        this.totalPrice = 0;
        this.currentItemsInCart.forEach((item, key) => {
            if (item.is_flip_over) {
                this.totalPrice += (this.prices.flip_over * item.amount);
            } else {
                this.totalPrice += (this.prices.book * item.amount);
            }
        });

        if (!this.prices.can_get_free_shipping) {
            this.totalPrice += this.prices.shipping;
        }
    }

    payCart(cartData) {
        if (this.isCheckingOut) {
            return;
        }
        this.isCheckingOut = true;

        this._cos.checkOut({ books: cartData }).subscribe(res => {
            // console.log(res);
            this._ns.success('Payment successfull!', 'We have sent you a confirmation email with additional details.');
            this.store.dispatch(new CartActions.ClearCart({}));
            this.isCheckingOut = false;
        });
    }

    removeFromCart(itemData) {
        this.store.dispatch(new CartActions.RemoveFromCart({ item: itemData }));
        this.recalculatePrice();
    }

    returnToPreviousPage() {
        this.location.back();
    }
}
