import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { QuoteService } from '../../../../services/application-services/quote.service';

import { Store } from '@ngrx/store';

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

    quotes = []; // todo model quote
    msnry;
    childShortId: String;

    currentChildren = [];
    currentChild = {};

    loading = true;

    constructor(
        private _qs: QuoteService,
        private route: ActivatedRoute,
        private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_CHILDREN').subscribe(CURRENT_CHILDREN => {
            let cc: any = CURRENT_CHILDREN;

            this.currentChildren = cc.children;

            this.currentChildren.forEach((child, key) => {
                if (child.short_id === this.childShortId) {
                    console.log(child);
                    this.currentChild = child;
                }
            });

        });

        this.store.select('QUOTES').subscribe(QUOTES => {
            let q: any = QUOTES;

            if (q.newQuote !== {}) {
                this.quotes.push(q.newQuote);
            }
        });

        this.route.params.subscribe(params => {
            this.childShortId = params.short_id_child;
            this.quotes = [];
            this.loading = true;

            this._qs.getPost(this.childShortId)
                .subscribe(res => {
                    this.loading = false;
                    this.quotes = res.posts;
                });

            this.currentChildren.forEach((child, key) => {
                if (child.short_id === this.childShortId) {
                    console.log(child);
                    this.currentChild = child;
                }
            });

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
}
