import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpHelperService } from './http-helper.service';

import { API_ROUTES } from '../_api-routes/api.routes';

@Injectable()
export class RegisterService {

    constructor(private http: Http, private _hhs: HttpHelperService) { }

    registerUser(formData): Observable<any> {
        return this.http.post(API_ROUTES.registerRoutes.newUser, formData)
          .map(this._hhs.extractData)
          .catch(this._hhs.errorHandler);
    }

}
