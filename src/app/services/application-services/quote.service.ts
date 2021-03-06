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
        this.token = localStorage.getItem('_token');

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.posts.newQuote(childShortId),
            data,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // GET
    getAllPosts(): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.index,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getPosts(childShortId): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.getPosts(childShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getPost(childShortId, postShortId): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.getPost(childShortId, postShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    getFonts(): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.fonts, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    getPresetImg(): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.presetImg, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    // DELETE
    deletePost(childShortId, postShortId): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.delete(API_ROUTES.baseUrl + API_ROUTES.application.posts.deletePost(childShortId, postShortId),
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    // UPDATE
    updateQuote(childShortId, postShortId, data): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.posts.updateQuote(childShortId, postShortId),
            data,
            this._headers.setOptions(this.token))
                .map(res => this._hhs.extractData(res))
                .catch(err => this._hhs.errorHandler(err));
    }

    newStory(childShortId, data): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.story.newStory(childShortId),
            data,
            this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    updateStory(childShortId, postShortId, data): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.post(API_ROUTES.baseUrl + API_ROUTES.application.story.updateStory(childShortId, postShortId),
            data,
            this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    sharePost(childShortId, postShortId): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.share(childShortId, postShortId),
            this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

    getLatestPost(): Observable<any> {
        this.token = localStorage.getItem('_token');

        return this.http.get(API_ROUTES.baseUrl + API_ROUTES.application.posts.latest, this._headers.setOptions(this.token))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
    }

}
