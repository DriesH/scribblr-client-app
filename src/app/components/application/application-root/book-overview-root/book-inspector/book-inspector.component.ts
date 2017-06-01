import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BookService } from '../../../../../services/application-services/book.service';

@Component({
    selector: 'scrblr-book-inspector',
    templateUrl: './book-inspector.component.html',
    styleUrls: ['./book-inspector.component.scss']
})
export class BookInspectorComponent implements OnInit {

    book;

    constructor(private route: ActivatedRoute, private _bs: BookService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this._bs.getBook(params['short_id_book']).subscribe(res => {
                this.book = res.book;
            });
        });
    }

}
