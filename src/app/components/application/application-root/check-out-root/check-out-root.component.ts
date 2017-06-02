import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { CheckOutService } from '../../../../services/application-services/check-out.service';

@Component({
    selector: 'scrblr-check-out-root',
    templateUrl: './check-out-root.component.html',
    styleUrls: ['./check-out-root.component.scss']
})
export class CheckOutRootComponent implements OnInit {

    prices: any = {};
    currentItemsInCart = [];

    qModel = {
        quantityBook: 0,
        quantityFlipover: 0
    };

    totalPrice = 0;

    constructor(private store: Store<any>, private _cos: CheckOutService) { }

    ngOnInit() {
        this._cos.getPrices().subscribe(res => {
            console.log(res);
            this.prices = res;
            this.recalculatePrice();
        });

        this.store.select('CART').subscribe((CART: any) => {
            this.currentItemsInCart = CART.items_in_cart;

            this.currentItemsInCart.forEach((item, key) => {
                if (!item.is_flip_over) {
                    this.qModel.quantityBook++;
                } else if (item.is_flip_over) {
                    this.qModel.quantityFlipover++;
                }
            });

        });
    }

    recalculatePrice() {
        this.totalPrice = (this.prices.book * this.qModel.quantityBook) + (this.prices.flip_over * this.qModel.quantityFlipover);

        if (!this.prices.can_get_free_shipping) {
            this.totalPrice += this.prices.shipping;
        }

    }

}
