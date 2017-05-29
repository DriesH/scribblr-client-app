import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHelperService } from '../http-helper.service';
import { HttpHeaderService } from '../http-header.service';

import { Observable } from 'rxjs/Observable';

import { APP_CONFIG } from '../../_config/app.config';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HeaderOptions } from '../../models/header-options';

@Injectable()
export class PexelsapiService {

    constructor(
        private http: Http,
        private _hhs: HttpHelperService,
        private _headers: HttpHeaderService) {
        }

    searchImages(query): Observable<any> {
        return this.http.get('https://api.pexels.com/v1/search?query=' + query + '&per_page=15&page=1',
        this._headers.setOptions(APP_CONFIG.pexelsApiKey))
            .map(res => this._hhs.extractData(res))
            .catch(err => this._hhs.errorHandler(err));
        }

}
