import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'scrblr-book-thumbnail',
    templateUrl: './book-thumbnail.component.html',
    styleUrls: ['./book-thumbnail.component.scss']
})
export class BookThumbnailComponent implements OnInit {

    @Input('bookData') bookData;
    @Input('last') last;
    @Input('bookShortId') bookShortId: string;

    @Output('reachedLast') reachedLast = new EventEmitter<Boolean>();

    inspectorLink = '';

    constructor() { }

    ngOnInit() {
        if (this.bookData.is_flip_over) {
            this.inspectorLink = 'flip-book/' + this.bookData.short_id;
        } else {
            this.inspectorLink = 'book/' + this.bookData.short_id;
        }
    }

    imgLoaded() {
        if (this.last) {
            this.reachedLast.emit(true);
        }
    }

}
