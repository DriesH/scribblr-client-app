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
    newPost(childShortId, data): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.posts.newPost(childShortId),
            data,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // GET
    getAllPosts(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.index,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getPost(childShortId): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.getPost(childShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getFonts(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.fonts, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    getPresetImg(): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.presetImg, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    // DELETE
    deletePost(childShortId, postShortId): Observable<any> {
        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.deletePost(childShortId, postShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // UPDATE
    updatePost(childShortId, postShortId): Observable<any> {
        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.posts.updatePost(childShortId, postShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

}
