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

import * as FlipBookActions from '../actions/flip-book.action';

@Injectable()
export class FlipBookEffect {

    @Effect()
    addFlipBookPostBackToList$: Observable<any> = this.actions$
        .ofType(FlipBookActions.ActionTypes.UPDATE_BOOK_PAGE)
        .map(toPayload)
        .mergeMap(payload => {
            if (payload.isMemory) {
                return [
                    new FlipBookActions.AddToFlipBookPostList({ shortId: payload.originalShortId }),
                    new FlipBookActions.AddToFlipBookPostList({ shortId: payload.originalShortId })
                ];
            } else {
                return [
                    new FlipBookActions.AddToFlipBookPostList({ shortId: payload.originalShortId }),
                ];
            }
        });

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<any>) { }
}


