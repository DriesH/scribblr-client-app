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

import * as BookActions from '../actions/book.action';

@Injectable()
export class BookEffect {

    @Effect()
    addPostBackToList$: Observable<any> = this.actions$
        .ofType(BookActions.ActionTypes.UPDATE_BOOK_PAGE)
        .map(toPayload)
        .mergeMap(payload => {
            if (payload.isMemory) {
                return [
                    new BookActions.AddToPostList({ shortId: payload.originalShortId.pageLeft }),
                    new BookActions.AddToPostList({ shortId: payload.originalShortId.pageRight })
                ];
            } else {
                return [
                    new BookActions.AddToPostList({ shortId: payload.originalShortId.pageLeft }),
                ];
            }
        });

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<any>) { }
}


