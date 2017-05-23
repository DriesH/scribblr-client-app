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
        let body;

        switch (res.status) {
            case 500:
                this._ehs.handler({
                    success: false,
                    error_type: 'internal_server',
                    error_message: 'something went wrong on the server',
                    errors: [],
                    old_input: null
                });
                break;
            case 404:
                this._ehs.handler({
                    success: false,
                    error_type: 'model_not_found',
                    error_message: 'we didn\'t vind it',
                    errors: [],
                    old_input: null
                });
                break;
            default:
                body = res.json();
                this._ehs.handler(body);
                break;
        }
        return Observable.throw(body);
    }
}
