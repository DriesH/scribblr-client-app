import { Component, OnInit } from '@angular/core';

import { BookService } from '../../../../services/application-services/book.service';

@Component({
    selector: 'scrblr-book-overview-root',
    templateUrl: './book-overview-root.component.html',
    styleUrls: ['./book-overview-root.component.scss']
})
export class BookOverviewRootComponent implements OnInit {

    books = [];

    constructor(private _bs: BookService) { }

    ngOnInit() {
        this._bs.getAllBooks().subscribe(res => {
            this.books = res.books;
        });
    }
}
