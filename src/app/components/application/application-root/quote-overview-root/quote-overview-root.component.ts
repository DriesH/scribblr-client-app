import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { QuoteService } from '../../../../services/application-services/quote.service';

import { Store } from '@ngrx/store';

import { FacebookService, UIParams, UIResponse, InitParams  } from 'ngx-facebook';

import * as QuoteActions from '../../../../ngrx-state/actions/quote.action';

declare var Masonry: any;

@Component({
    selector: 'scrblr-quote-overview-root',
    templateUrl: './quote-overview-root.component.html',
    styleUrls: [
        './quote-overview-root.component.scss',
        './quote-overview-root.media.scss'
    ]
})
export class QuoteOverviewRootComponent implements OnInit, AfterViewInit {

    @ViewChild('fileUpload')     fileUpload: ElementRef;
    @ViewChild('editableImage')  editableImage: ElementRef;
    @ViewChild('dropzoneInput')  dropzoneInput: ElementRef;
    @ViewChild('quoteContainer') quoteContainer: ElementRef;

    posts = []; // todo model quote
    msnry;
    childShortId: String;

    currentChildren = [];
    currentChild = {};

    amountOf = {
        quotes: null,
        memories: null
    };

    loading = true;

    constructor(
        private _qs: QuoteService,
        private route: ActivatedRoute,
        private store: Store<any>,
        private facebook: FacebookService
    ) {
        let initParams: InitParams = {
            appId: '1236834116439954',
            xfbml: true,
            version: 'v2.8'
        };

        facebook.init(initParams);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.childShortId = params.short_id_child;
            this.posts = [];
            this.loading = true;

            this._qs.getPosts(this.childShortId)
                .subscribe(res => {
                    this.loading = false;
                    this.posts = res.posts;
                });

            this.currentChildren.forEach((child, key) => {
                if (child.short_id === this.childShortId) {
                    // console.log(child);
                    this.currentChild = child;
                }
            });
        });

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            this.currentChildren = CURRENT_CHILDREN.children;

            this.currentChildren.forEach((child, key) => {
                if (child.short_id === this.childShortId) {
                    // console.log(child);
                    this.currentChild = child;
                }
            });

        });

        this.store.select('QUOTES').subscribe((QUOTES: any) => {
            if (QUOTES.updateQuote !== {}) {
                console.log(QUOTES);
                this.posts.forEach((item, key) => {
                    if (item.short_id === QUOTES.updateQuote.short_id) {
                        console.log(item);
                        item = QUOTES.updateQuote;
                    }
                });
                // this.store.dispatch(new QuoteActions.ClearQuoteState({}));
            }

            if (QUOTES.newQuote !== {}) {
                this.posts.push(QUOTES.newQuote);
            }
        });
    }

    ngAfterViewInit() {
    }

    initMasonry() {
        // console.log('initMasonry');
        this.msnry = new Masonry(this.quoteContainer.nativeElement, {
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            percentPosition: true,
            stagger: 20,
            initLayout: false
        });
        this.reloadMasonry();
    }

    reloadMasonry() {
        // console.log('reloadMasonry');
        this.msnry.layout();
    }

    removeQuote(postShortId) {
        this._qs.deletePost(this.childShortId, postShortId).subscribe(res => {
            this.posts = this.posts.filter((post) => {
                return post.short_id !== postShortId;
            });

            setTimeout(() => {
                this.reloadMasonry();
            }, 100);
        });
    }

    shareFb(shareData) {
        this._qs.sharePost(shareData.data.child_short_id, shareData.data.post_short_id).subscribe(res => {
            this.facebook.ui(shareData.fbData).then((resFb: UIResponse) => {
                // console.log(resFb);
            }).catch((e: any) => {
                console.log(e);
            });
        });
    }
}
