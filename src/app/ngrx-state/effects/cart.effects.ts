/* tslint:disable:member-ordering:max-line-length */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { CheckOutService } from '../../services/application-services/check-out.service';

import { NotificationsService } from 'angular2-notifications';

import * as CartActions from '../actions/cart.action';

@Injectable()
export class CartEffect {

    @Effect()
    checkBeforeAdding$: Observable<any> = this.actions$
        .ofType(CartActions.ActionTypes.CHECK_BEFORE_ADD)
        .map(toPayload)
        .switchMap(payload => {
            this._cs.checkForEmptyPages(payload.new_item.short_id).subscribe((res) => {
                if (res.has_empty_pages) {
                    this._ns.alert('Heads up!', 'You added a book with empty pages to your shopping cart.');
                } else {
                    this._ns.success('Added to shopping cart!', 'You added a book to your shopping cart.');
                }
            });
            return Observable.of(new CartActions.AddToCart({ new_item: payload.new_item }));
        });

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<any>,
        private _cs: CheckOutService,
        private _ns: NotificationsService
        ) { }
}


