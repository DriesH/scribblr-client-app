import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import { Router } from '@angular/router';

import { BookService } from '../../../../../../services/application-services/book.service';

import * as CartActions from '../../../../../../ngrx-state/actions/cart.action';

@Component({
  selector: 'scrblr-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

    isSaved = false;
    isFailed = false;

    @Input('bookModel') bookModel;
    @Input('book') book;
    @Input('isEditing') isEditing;

    @Output('close') close = new EventEmitter<boolean>();

    constructor(private _bs: BookService, private store: Store<any>, private router: Router) { }

    ngOnInit() {
        this.isSaved = false;
        this.isFailed = false;
    }

    saveAndOrderBook(bookModel, book) {
        bookModel.book = book;
        this._bs.saveBook(bookModel).subscribe(res => {
            // console.log(res);
            this.isSaved = true;
            this.isFailed = false;
            this.store.dispatch(new CartActions.AddToCart({ new_item: res.book }));
            this.router.navigate(['checkout']);
        }, err => {
            this.isSaved = false;
            this.isFailed = true;
        });
    }

    order(bookShortId, bookModel, book) {
        bookModel.book = book;
        this._bs.editBook(bookShortId, bookModel).subscribe(res => {
            // console.log(res);
            this.isSaved = true;
            this.isFailed = false;
        }, err => {
            this.isSaved = false;
            this.isFailed = true;
        });
    }

    closeModal() {
        this.close.emit(true);
    }
}
