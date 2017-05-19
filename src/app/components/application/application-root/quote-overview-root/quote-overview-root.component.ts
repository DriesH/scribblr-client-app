import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { QuoteService } from '../../../../services/application-services/quote.service';

import { Store } from '@ngrx/store';

declare var Masonry: any;

@Component({
    selector: 'scrblr-quote-overview-root',
    templateUrl: './quote-overview-root.component.html',
    styleUrls: ['./quote-overview-root.component.scss']
})
export class QuoteOverviewRootComponent implements OnInit, AfterViewInit {

    @ViewChild('fileUpload')     fileUpload: ElementRef;
    @ViewChild('editableImage')  editableImage: ElementRef;
    @ViewChild('dropzoneInput')  dropzoneInput: ElementRef;
    @ViewChild('quoteContainer') quoteContainer: ElementRef;

    quotes; // todo model quote
    msnry;
    childShortId: String;

    constructor(
        private _qs: QuoteService,
        private route: ActivatedRoute,
        private store: Store<any>) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.childShortId = params.short_id;
            this.quotes = [];

            this._qs.getQuote(this.childShortId)
                .subscribe(res => {
                    this.quotes = res.quotes;
                });
        });

        this.store.select('QUOTES').subscribe(QUOTES => {
            let q: any = QUOTES;

            if (q.newQuote !== {}) {
                this.quotes.push(q.newQuote);
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
}
