import { Component, OnInit, Input } from '@angular/core';

interface QuoteModel {
    quote: string;
}

@Component({
    selector: 'scrblr-quick-quote',
    templateUrl: './quick-quote.component.html',
    styleUrls: ['./quick-quote.component.scss']
})
export class QuickQuoteComponent implements OnInit {

    @Input('children') children;

    quoteModel: QuoteModel = {
        quote: null
    };

    constructor() { }

    ngOnInit() {
    }

    avatarUrl(child) {
        if (!child) {
            return;
        }

        if (!child.avatar_url_id) {
            return '/assets/default-avatars/' + child.gender + '.svg';
        }

        return child.avatar_url_id;
    }
}
