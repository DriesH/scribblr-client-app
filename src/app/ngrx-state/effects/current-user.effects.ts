import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as userActions from '../actions/current-user.action';

import { API_ROUTES } from '../../_api-routes/api.routes';

@Injectable()
export class CurrentUserEffect {

    userRoute: string;

    private makeHeaders(token) {
        let _headers = new Headers();
        let headers;

        _headers.append('Authorization', 'Bearer ' + token);
        headers = new RequestOptions({ headers: _headers });

        return Observable.of(headers);
    }

    private extractUser(res) {
        const user: Object = res.json();

        // console.log(user);

        const payload = {
            isAuth: true,
            user: user[0]
        };

        // console.log(payload);

        return (new userActions.SuccessfullLogin(payload));
    }

    // private removeToken() {
    //     console.log('removing token');
    //     return Observable.of(localStorage.removeItem('_token'));
    // }

    // This effect authenticates the user when he/her has a
    // JWT Token in the localStorage. If it fails it throws an error.
    /* tslint:disable-next-line:member-ordering */
    @Effect()
    loginWithToken$: Observable<Action> = this.actions$
        .ofType(userActions.ActionTypes.TOKEN_PRESENT)
        .map(toPayload)
        .switchMap(token => this.makeHeaders(token))
        .switchMap(headers => this.http.get(this.userRoute, headers)
            .map(res => this.extractUser(res))
            .catch(() => Observable.of(new userActions.ErrorLogin({}))));

    // Remove the token from the localStorage on fail.
    /* tslint:disable-next-line:member-ordering */
    // @Effect({ dispatch: false })
    // removeOldToken$: Observable<any> = this.actions$
    //     .ofType(userActions.ActionTypes.ERROR_LOGIN)
    //     .map(toPayload)
    //     .switchMap(() => this.removeToken());

    constructor(private actions$: Actions, private http: Http) {
        this.userRoute = API_ROUTES.baseUrl + API_ROUTES.getUserRoute;
    }
}
