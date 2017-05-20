import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpHelperService } from './http-helper.service';

import { API_ROUTES } from '../_api-routes/api.routes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RegisterService {

    registerRoute: string;

    constructor(private http: Http, private _hhs: HttpHelperService) {
        this.registerRoute = API_ROUTES.baseUrl + API_ROUTES.registerRoutes.newUser;
    }

    registerUser(formData): Observable<any> {
        return this.http.post(this.registerRoute, formData)
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }
}
