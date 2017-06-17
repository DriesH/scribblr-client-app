import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import * as CartActions from '../../../../../ngrx-state/actions/cart.action';

import { BookService } from '../../../../../services/application-services/book.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'scrblr-book-thumbnail',
    templateUrl: './book-thumbnail.component.html',
    styleUrls: ['./book-thumbnail.component.scss', './book-thumbnail.media.scss']
})
export class BookThumbnailComponent implements OnInit {

    @Input('bookData') bookData;
    @Input('last') last;
    @Input('bookShortId') bookShortId: string;

    @Output('reachedLast') reachedLast = new EventEmitter<Boolean>();
    @Output('deletedBook') deletedBook = new EventEmitter<string>();

    inspectorLink = '';

    isDeleting = false;

    constructor(private store: Store<any>, private _bs: BookService, private _ns: NotificationsService) { }

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
        this.store.dispatch(new CartActions.CheckBeforeAdd({ new_item: bookData }));
    }

    deleteBook(event, bookShortId) {
        event.stopPropagation();

        if (this.isDeleting) {
            return;
        }

        this.isDeleting = true;
        this._bs.deleteBook(bookShortId).subscribe(res => {
            if (res.can_delete) {
                this.deletedBook.emit(bookShortId);
                this.store.dispatch(new CartActions.ClearCart({}));
            } else {
                this._ns.alert('Can\'t delete book!', 'You can\'t delete this book. It is currently being ordered.');
            }
            this.isDeleting = false;
        });
    }

}
