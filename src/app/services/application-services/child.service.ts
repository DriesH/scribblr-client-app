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
export class ChildService {

    token;

    constructor(
        private http: Http,
        private _hhs: HttpHelperService,
        private _headers: HttpHeaderService) {
            this.token = localStorage.getItem('_token');
        }

    // POST
    newChild(data): Observable<any> {

        this._headers.setOptions(this.token);

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.child.newChild,
            data,
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    uploadChildImage(shortId, data): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.child.uploadChildImage(shortId),
            data,
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    // GET
    getAllChildren(): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.child.index,
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    getChild(shortId): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.child.getChild(shortId),
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    // DELETE
    deleteChild(shortId): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.delete(API_ROUTES.baseUrl + API_ROUTES.application.child.deleteChild(shortId),
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    // PUT
    editChild(shortId, data): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.put(API_ROUTES.application.child.editChild(shortId),
            data,
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }
}
