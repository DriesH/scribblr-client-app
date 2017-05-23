import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

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

    @Output('clickedQuote') clickedQuote = new EventEmitter<Boolean>();

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
    }

    formatImageSrc(child_short_id, quote_short_id, img_original_url_id?, img_baked_url_id?): String {
        if (img_original_url_id) {
            return API_ROUTES.baseUrl + API_ROUTES.application.quotes.imageOriginal(child_short_id, quote_short_id, img_original_url_id);
        } else if (img_baked_url_id) {
            return API_ROUTES.baseUrl + API_ROUTES.application.quotes.imageBaked(child_short_id, quote_short_id, img_baked_url_id);
        } else {
            return null;
        }

    }

    imageLoadedFn() {
        this.imageLoaded.emit(true);
    }

    clickedQuoteFn() {
        this.isClicked = !this.isClicked;

        if (this.isClicked) {
            this.quoteBlock.nativeElement.className = 'grid-item-double';
        } else {
            this.quoteBlock.nativeElement.className = 'grid-item';
        }
        this.clickedQuote.emit(true);
    }
}
