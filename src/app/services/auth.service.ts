import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpHelperService } from './http-helper.service';

import { API_ROUTES } from '../_api-routes/api.routes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {

    loginRoute: string;

    constructor(private http: Http, private _hhs: HttpHelperService) {
        this.loginRoute = API_ROUTES.baseUrl + API_ROUTES.loginRoutes.loginUser;
    }

    authenticateUser(formData): Observable<any> {
        return this.http.post(this.loginRoute, formData)
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

}
