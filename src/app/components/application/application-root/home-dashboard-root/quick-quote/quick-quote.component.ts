import { Component, OnInit } from '@angular/core';

interface QuoteModel {
    quote: string;
}

@Component({
    selector: 'scrblr-quick-quote',
    templateUrl: './quick-quote.component.html',
    styleUrls: ['./quick-quote.component.scss']
})
export class QuickQuoteComponent implements OnInit {

    quoteModel: QuoteModel = {
        quote: null
    };

    constructor() { }

    ngOnInit() {
    }

}
