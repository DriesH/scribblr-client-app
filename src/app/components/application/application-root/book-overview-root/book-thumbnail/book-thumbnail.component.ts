import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import * as CartActions from '../../../../../ngrx-state/actions/cart.action';

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

    constructor(private store: Store<any>) { }

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

    addToCart(event, bookData) {
        event.stopPropagation();
        this.store.dispatch(new CartActions.AddToCart({ new_item: bookData }));
    }

}
