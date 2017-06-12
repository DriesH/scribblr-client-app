import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Router, Event, NavigationEnd } from '@angular/router';

import { BookService } from '../../../../services/application-services/book.service';

declare var Masonry: any;

@Component({
    selector: 'scrblr-book-overview-root',
    templateUrl: './book-overview-root.component.html',
    styleUrls: ['./book-overview-root.component.scss', 'book.media.scss']
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

        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationEnd) {
                if (this.router.url === '/application/books/new') {
                    this.editorActive = true;
                } else {
                    if (!this.isGetting) {
                        this.editorActive = false;
                        this.isGetting = true;

                        this._bs.getAllBooks().subscribe(res => {
                            if (res.books.length <= 0) {
                                this.noBooks = true;
                            } else {
                                this.noBooks = false;
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

    ngAfterViewInit() { }

    initMasonry() {
        this.msnry = new Masonry(this.bookContainer.nativeElement, {
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
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

    removeBook(bookShortId) {
        let index = -1;
        this.books.forEach((book, key) => {
            if (book.short_id === bookShortId) {
                index = key;
            }
        });

        if (index !== -1) {
            this.books.splice(index, 1);
        }

        setTimeout(() => {
            this.initMasonry();
        }, 300);

        if (!this.books.length) {
            this.noBooks = true;
        }
    }

}
