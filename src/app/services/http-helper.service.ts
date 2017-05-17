import { Injectable } from '@angular/core';

import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from './error-handler.service';
import { AchievementUnlockableService } from './achievement-unlockable.service';

@Injectable()
export class HttpHelperService {

    constructor(
        private _ehs: ErrorHandlerService,
        private _aus: AchievementUnlockableService) { }

    public extractData(res: Response) {
        let body = res.json();

        if (body.achievement) {
            this._aus.unlock(body.achievement);
        }

        return body || {};
    }

    public errorHandler(res: Response | any) {
        let body = res.json();
        console.log(this._ehs);
        this._ehs.handler(body);
        return Observable.throw(body);
    }
}
