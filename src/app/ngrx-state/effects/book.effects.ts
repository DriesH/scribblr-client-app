/* tslint:disable:member-ordering */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

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
        .switchMap(payload => Observable.of(new BookActions.AddToPostList({ shortId: payload.originalShortId })));

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<any>) { }
}


