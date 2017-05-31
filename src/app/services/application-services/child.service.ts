import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHelperService } from '../http-helper.service';
import { HttpHeaderService } from '../http-header.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { API_ROUTES } from '../../_api-routes/api.routes';

import { HeaderOptions } from '../../models/header-options';

@Injectable()
export class ChildService {

    token;

    constructor(
        private http: Http,
        private _hhs: HttpHelperService,
        private _headers: HttpHeaderService) {
            this.token = localStorage.getItem('_token');
        }

    // POST
    newChild(data, headers?: Array<HeaderOptions>): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.child.newChild,
            data,
            this._headers.setOptions(this.token, headers))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    uploadChildImage(shortId, data): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.child.uploadChildImage(shortId),
            data,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // GET
    getAllChildren(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.child.index,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getChild(shortId): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.child.getChild(shortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // DELETE
    deleteChild(shortId): Observable<any> {
        return this.http.delete(API_ROUTES.baseUrl + API_ROUTES.application.child.deleteChild(shortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // PUT
    editChild(shortId, data): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.child.editChild(shortId),
            data,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }
}
