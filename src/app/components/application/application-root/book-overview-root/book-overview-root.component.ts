import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { BookService } from '../../../../services/application-services/book.service';

@Component({
    selector: 'scrblr-book-overview-root',
    templateUrl: './book-overview-root.component.html',
    styleUrls: ['./book-overview-root.component.scss']
})
export class BookOverviewRootComponent implements OnInit {

    editorActive = false;
    bookInspectorActive = false;

    books = [];

    constructor(private _bs: BookService, private router: Router) { }

    ngOnInit() {
        this.editorActive = false;

        this.router.events.subscribe(e => {
            if (this.router.url === '/application/books/new') {
                this.editorActive = true;
            } else {
                this._bs.getAllBooks().subscribe(res => {
                    this.books = res.books;
                });
                this.editorActive = false;
            }
        });
    }
}
