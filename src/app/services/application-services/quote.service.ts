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

        this._headers.setOptions(this.token);

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.quotes.newQuote(childShortId),
            data,
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    // GET
    getAllQuotes(): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.quotes.index,
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    getQuote(childShortId): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.quotes.getQuote(childShortId),
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    // DELETE
    deleteQuote(childShortId, quoteShortId): Observable<any> {
        this._headers.setOptions(this.token);

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.quotes.deleteQuote(childShortId, quoteShortId),
            this._headers.setOptions(this.token))
            .map(this._hhs.extractData)
            .catch(this._hhs.errorHandler);
    }

    // PUT
    // TODO:

}
