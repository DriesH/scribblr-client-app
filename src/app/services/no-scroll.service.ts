import { Injectable } from '@angular/core';

@Injectable()
export class NoScrollService {

    constructor() { }

    setNoScroll(body) {
        body.className = 'no-scrolling';
    }

    removeNoScroll(body) {
        body.className = '';
    }


}
