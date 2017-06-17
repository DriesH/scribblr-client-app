import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { BookService } from '../../../../../../services/application-services/book.service';

@Component({
    selector: 'scrblr-save-modal',
    templateUrl: './save-modal.component.html',
    styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements OnInit, OnDestroy {

    isSaved = false;
    isFailed = false;

    @Input('bookModel') bookModel;
    @Input('book') book;
    @Input('configuration') configuration;

    @Output('close') close = new EventEmitter<boolean>();

    constructor(private _bs: BookService) { }

    ngOnInit() {
        this.isSaved = false;
        this.isFailed = false;

        this.addEventListeners();
    }

    ngOnDestroy() {
        this.removeEventListeners();
    }

    addEventListeners() {
        document.addEventListener('keyup', this.saveOnEnter.bind(this));
    }

    removeEventListeners() {
        document.removeEventListener('keyup', this.saveOnEnter.bind(this));
    }

    saveOnEnter() {
        this.saveBook(this.bookModel, this.book);
    }

    saveBook(bookModel, book) {
        bookModel.book = book;
        this._bs.saveBook(bookModel).subscribe(res => {
            this.isSaved = true;
            this.isFailed = false;
        }, err => {
            this.isSaved = false;
            this.isFailed = true;
        });
    }

    editBook(bookShortId, bookModel, book) {
        bookModel.book = book;
        this._bs.editBook(bookShortId, bookModel).subscribe(res => {
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
