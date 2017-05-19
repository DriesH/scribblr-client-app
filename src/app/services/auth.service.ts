import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { HttpHelperService } from './http-helper.service';

import { API_ROUTES } from '../_api-routes/api.routes';

import { Store } from '@ngrx/store';
import * as userActions from '../ngrx-state/actions/current-user.action';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {

    loginRoute: string;
    userRoute: string;
    _token: string;

    CURRENT_USER;

    constructor(private http: Http,
        private _hhs: HttpHelperService,
        private store: Store<any>,
        private router: Router) {

            this.loginRoute = API_ROUTES.baseUrl + API_ROUTES.loginRoutes.loginUser;
            this.userRoute = API_ROUTES.baseUrl + API_ROUTES.getUserRoute;

            this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
                this.CURRENT_USER = CURRENT_USER;
            });
    }

    authenticateUser(formData): Observable<any> {
        return this.http.post(this.loginRoute, formData)
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    getUser() {
        if (this.CURRENT_USER.isAuth) {
            this.router.navigate(['/home']);
            return true;
        }

        this._token = localStorage.getItem('_token');

        if (this._token !== null) {
            console.log('test get user true');
            this.store.dispatch(new userActions.TokenIsPresent(this._token));
            return true;
        } else {
            console.log('test get user false');

            return false;
        }

    }
}
