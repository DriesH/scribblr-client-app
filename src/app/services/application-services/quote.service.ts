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
export class QuoteService {

    token;

    constructor(
        private http: Http,
        private _hhs: HttpHelperService,
        private _headers: HttpHeaderService) {
            this.token = localStorage.getItem('_token');
    }

    // POST
    newQuote(childShortId, data): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.quotes.newQuote(childShortId),
            data,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // GET
    getAllQuotes(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.quotes.index,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getQuote(childShortId): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.quotes.getQuote(childShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // DELETE
    deleteQuote(childShortId, quoteShortId): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.quotes.deleteQuote(childShortId, quoteShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // PUT
    // TODO:

}
