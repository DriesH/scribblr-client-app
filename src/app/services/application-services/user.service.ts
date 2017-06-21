// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHelperService } from '../http-helper.service';
import { HttpHeaderService } from '../http-header.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { API_ROUTES } from '../../_api-routes/api.routes';

@Injectable()
export class UserService {

    token;

    constructor(
        private http: Http,
        private _hhs: HttpHelperService,
        private _headers: HttpHeaderService) {
          this.token = localStorage.getItem('_token');
    }

    // POST
    updateUser(data): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.user.update,
            data,
            this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    getCountries(): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.user.countries, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

}
