import { Injectable } from '@angular/core';

import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpHelperService {

    constructor() { }

    public extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    public errorHandler(res: Response | any) {
        let errMessage = res.status;
        return Observable.throw(errMessage);
    }
}
