import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'scrblr-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

    @Input('quoteData') quoteData;
    @Input('last') last;

    @Output('reachedLast') reachedLast = new EventEmitter<Boolean>();

    constructor() { }

    ngOnInit() {
        if (this.last) {
            this.reachedLast.emit(true);
        }
    }



}
