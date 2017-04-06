import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpHelperService } from './http-helper.service';

import { API_ROUTES } from '../_api-routes/api.routes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {

    loginRoute: string;
    userRoute: string;

    constructor(private http: Http, private _hhs: HttpHelperService) {
        this.loginRoute = API_ROUTES.baseUrl + API_ROUTES.loginRoutes.loginUser;
        this.userRoute = API_ROUTES.baseUrl + API_ROUTES.getUserRoute;
    }

    authenticateUser(formData): Observable<any> {
        return this.http.post(this.loginRoute, formData)
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    getUserData(token): Observable<any> {
        let _headers = new Headers();
        let headers;

        _headers.append('Authorization', 'Bearer ' + token);
        headers = new RequestOptions({ headers: _headers });

        return this.http.get(this.userRoute, headers)
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

}
