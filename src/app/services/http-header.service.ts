import { Injectable } from '@angular/core';

import { RequestOptions, Headers } from '@angular/http';

import { HeaderOptions } from '../models/header-options';

@Injectable()
export class HttpHeaderService {

    constructor() { }

    setOptions(token, otherHeaders?: Array<HeaderOptions>) {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + token);

        if (otherHeaders) {
            otherHeaders.forEach((h, key) => {
                headers.append(h.prop, h.value);
            });
        }

        return new RequestOptions({ headers: headers });
    }

}
