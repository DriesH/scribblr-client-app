import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

@Component({
    selector: 'scrblr-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

    @Input('quoteData') quoteData;
    @Input('last') last;
    @Input('childShortId') childShortId: String;

    @Output('reachedLast') reachedLast = new EventEmitter<Boolean>();
    @Output('imageLoaded') imageLoaded = new EventEmitter<Boolean>();

    imageHasBeenLoaded = false;

    counter = 0;
    scrollContainer: HTMLElement;

    constructor() { }

    ngOnInit() {
        this.scrollContainer = document.getElementById('gridboi');

        if (this.last) {
            this.reachedLast.emit(true);
        }
    }

    formatImageSrc(child_short_id, quote_short_id, img_original_url_id?, img_baked_url_id?): String {
        // console.log('[formatImageSrc]: I got called.');

        // console.log('[formatImageSrc]: child_short_id=', child_short_id);
        // console.log('[formatImageSrc]: quote_short_id=', quote_short_id);
        // console.log('[formatImageSrc]: img_original_url_id=', img_original_url_id);
        // console.log('[formatImageSrc]: img_baked_url_id=', img_baked_url_id);

        if (img_original_url_id) {
            // console.log('[formatImageSrc]: returned img_original_url_id.');
            return API_ROUTES.baseUrl + API_ROUTES.application.quotes.imageOriginal(child_short_id, quote_short_id, img_original_url_id);
        } else if (img_baked_url_id) {
            // console.log('[formatImageSrc]: returned img_baked_url_id.');
            return API_ROUTES.baseUrl + API_ROUTES.application.quotes.imageBaked(child_short_id, quote_short_id, img_baked_url_id);
        } else {
            return null;
        }

    }

    imageLoadedFn() {
        console.log('imageLoadedFn');
        setTimeout(() => {
            this.imageHasBeenLoaded = true;
        }, 400);
        this.imageLoaded.emit(true);
    }
}
