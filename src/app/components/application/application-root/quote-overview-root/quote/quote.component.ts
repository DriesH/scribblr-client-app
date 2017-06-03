import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { UIParams } from 'ngx-facebook';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

@Component({
    selector: 'scrblr-quote',
    templateUrl: './quote.component.html',
    styleUrls: [
        './quote.component.scss',
        './quote.media.scss'
    ]
})
export class QuoteComponent implements OnInit {

    @Input('quoteData') quoteData;
    @Input('last') last;
    @Input('childShortId') childShortId: String;

    @Output('reachedLast') reachedLast = new EventEmitter<Boolean>();
    @Output('imageLoaded') imageLoaded = new EventEmitter<Boolean>();

    @Output('removeQuote') removeQuote = new EventEmitter<String>();

    @Output('shareFb') shareFb = new EventEmitter<Object>();

    @ViewChild('quoteBlock') quoteBlock: ElementRef;

    imageHasBeenLoaded = false;

    counter = 0;
    scrollContainer: HTMLElement;

    isClicked = false;

    constructor() { }

    ngOnInit() {
        this.scrollContainer = document.getElementById('gridboi');

        if (this.last) {
            this.reachedLast.emit(true);
        }

        // console.log(this.quoteData);
    }

    formatImageSrc(child_short_id, post_short_id, img_original_url_id?, img_baked_url_id?): String {
        if (img_original_url_id) {
            return API_ROUTES.baseUrl + API_ROUTES.application.posts.imageOriginal(child_short_id, post_short_id, img_original_url_id);
        } else if (img_baked_url_id) {
            return API_ROUTES.baseUrl + API_ROUTES.application.posts.imageBaked(child_short_id, post_short_id, img_baked_url_id);
        } else {
            return null;
        }
    }

    imageLoadedFn() {
        this.imageLoaded.emit(true);
    }

    removeQuoteFn(shortId) {
        this.removeQuote.emit(shortId);
    }

    share($event: Event, childShortId, postShortId, imgBakedUrlId) {
        $event.stopPropagation();

        let data = {
            child_short_id: childShortId,
            post_short_id: postShortId
        };

        let params: UIParams = {
            href: location.origin + '/shared/' + childShortId + '/' + postShortId + '/' + imgBakedUrlId,
            method: 'share'
        };

        this.shareFb.emit({ data: data, fbData: params });
    }

    copyLink() {

    }
}
