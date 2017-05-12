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

import { Observable } from 'rxjs/Observable';

import * as childActions from '../actions/child.action';

@Injectable()
export class ChildEffect {

    /* tslint:disable-next-line:member-ordering */
    // @Effect({ dispatch: false })
    // closeChildAddModal$: Observable<boolean> = this.actions$
    //     .ofType(childActions.ActionTypes.ADD_CHILD)
    //     .map(toPayload)
    //     .switchMap(() => this.router.navigate(['/application/children']));

    constructor(private actions$: Actions, private router: Router) { }
}
