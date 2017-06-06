import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import { CheckOutService } from '../../../../services/application-services/check-out.service';

import * as CartActions from '../../../../ngrx-state/actions/cart.action';

@Component({
    selector: 'scrblr-check-out-root',
    templateUrl: './check-out-root.component.html',
    styleUrls: ['./check-out-root.component.scss']
})
export class CheckOutRootComponent implements OnInit {

    prices: any = {};
    currentItemsInCart = [];

    totalPrice = 0;

    constructor(private store: Store<any>,
        private _cos: CheckOutService,
        private location: Location
    ) { }

    ngOnInit() {
        this._cos.getPrices().subscribe(res => {
            console.log(res);
            this.prices = res;
            this.recalculatePrice();
        });

        this.store.select('CART').subscribe((CART: any) => {
            this.currentItemsInCart = CART.items_in_cart;
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
        console.log(cartData);
        this._cos.checkOut({ books: cartData }).subscribe(res => {
            this.store.dispatch(new CartActions.ClearCart({}));
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
