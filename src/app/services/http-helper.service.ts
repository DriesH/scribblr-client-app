import { Injectable } from '@angular/core';

import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class HttpHelperService {

    constructor(private _ehs: ErrorHandlerService) { }

    public extractData(res: Response) {
        let body = res.json();

        if (body.achievement) {
            // do stuffs...
        }

        return body || {};
    }

    public errorHandler(res: Response | any) {
        let body = res.json();
        this._ehs.handler(body);
        return Observable.throw(body);
    }
}
