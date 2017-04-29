import { Injectable } from '@angular/core';

import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class HttpHeaderService {

    constructor() { }

    setOptions(token) {
        console.log(token);
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + token);

        return new RequestOptions({ headers: headers });
    }

}
