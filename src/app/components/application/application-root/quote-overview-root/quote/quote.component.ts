import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { UIParams } from 'ngx-facebook';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { NotificationsService } from 'angular2-notifications';

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
    @ViewChild('paragraphStory') paragraphStory: ElementRef;
    @ViewChild('storyContainer') storyContainer: ElementRef;

    imageHasBeenLoaded = false;

    counter = 0;
    scrollContainer: HTMLElement;

    isClicked = false;
    copyLinkText = 'Click to copy link';
    linkToCopy = '';

    ellipsisLength = 150;
    isFullStory = false;

    zIndexComponent = 1;


    constructor(private _qs: QuoteService, private _ns: NotificationsService) { }

    ngOnInit() {
        this.scrollContainer = document.getElementById('gridboi');

        if (this.last) {
            this.reachedLast.emit(true);
        }

        this.linkToCopy = location.origin + '/shared/' + this.childShortId + '/' + this.quoteData.short_id + '/' + this.quoteData.img_baked_url_id;
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

    share(event: Event, childShortId, postShortId, imgBakedUrlId) {
        event.stopPropagation();

        let data = {
            child_short_id: childShortId,
            post_short_id: postShortId
        };

        let params: UIParams = {
            href: location.origin + '/shared/' + childShortId + '/' + postShortId + '/' + imgBakedUrlId,
            method: 'share'
        };

        this._qs.sharePost(childShortId, postShortId).subscribe(res => {
            if (res.success) {
                this.shareFb.emit({ data: data, fbData: params });
            }
        });
    }

    triggerShare(event, childShortId, postShortId) {
        this._qs.sharePost(childShortId, postShortId).subscribe(res => {
            this._ns.info('Successfully copied', 'We copied the link to your clipboard!');
        });
    }

    openStory() {
        if (this.isFullStory) {
            this.zIndexComponent = 1;
            this.ellipsisLength = 150;
        } else {
            this.zIndexComponent = 65;
            this.ellipsisLength = 10000;
        }

        this.isFullStory = !this.isFullStory;
    }
}
