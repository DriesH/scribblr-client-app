import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Router, Event, NavigationEnd } from '@angular/router';

import { BookService } from '../../../../services/application-services/book.service';

declare var Masonry: any;

@Component({
    selector: 'scrblr-book-overview-root',
    templateUrl: './book-overview-root.component.html',
    styleUrls: ['./book-overview-root.component.scss']
})
export class BookOverviewRootComponent implements OnInit, AfterViewInit {

    editorActive = false;

    books = [];

    isLoading = false;
    noBooks = false;

    msnry;

    isGetting = false;

    @ViewChild('bookContainer') bookContainer;

    constructor(private _bs: BookService, private router: Router) { }

    ngOnInit() {
        this.isLoading = true;

        this.editorActive = false;

        this.router.events.subscribe((e: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.router.url === '/application/books/new') {
                    this.editorActive = true;
                } else {
                    if (!this.isGetting) {
                        this.editorActive = false;
                        this.isGetting = true;

                        this._bs.getAllBooks().subscribe(res => {
                            if (res.books.length <= 0) {
                                this.noBooks = true;
                            }
                            this.books = res.books;
                            this.isLoading = false;
                            this.isGetting = false;
                        });
                    }
                }
            }
        });
    }

    ngAfterViewInit() {
        this._bs.getAllBooks().subscribe(res => {
            if (res.books.length <= 0) {
                this.noBooks = true;
            }
            this.books = res.books;
            this.isLoading = false;
        });
    }

    initMasonry() {
        this.msnry = new Masonry(this.bookContainer.nativeElement, {
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            gutter: 10,
            percentPosition: true,
            stagger: 20,
            initLayout: false
        });
        this.reloadMasonry();
        setTimeout(this.reloadMasonry(), 100);
    }

    reloadMasonry() {
        this.msnry.layout();
    }

}
