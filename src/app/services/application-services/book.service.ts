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
export class BookService {

    token;

    constructor(
        private http: Http,
        private _hhs: HttpHelperService,
        private _headers: HttpHeaderService) {
            this.token = localStorage.getItem('_token');
    }

    // GET
   autoGenerateNewBook(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.book.generateNewBook, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    saveBook(bookShortId, bookData): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.book.newBook,
            bookData,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // GET
    getAllBooks(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.book.index,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getBook(bookShortId): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.book.getBook(bookShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // DELETE
    deleteBook(bookShortId): Observable<any> {
        return this.http.delete(API_ROUTES.baseUrl + API_ROUTES.application.book.deleteBook(bookShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }
}
