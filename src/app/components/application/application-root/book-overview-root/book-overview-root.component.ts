import { Component, OnInit } from '@angular/core';

import { BookService } from '../../../../services/application-services/book.service';
import { QuoteService } from '../../../../services/application-services/quote.service';
import { ChildService } from '../../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-book-overview-root',
    templateUrl: './book-overview-root.component.html',
    styleUrls: ['./book-overview-root.component.scss']
})
export class BookOverviewRootComponent implements OnInit {

    loadingPosts = true;
    loadingChildren = true;

    posts = null;
    children = null;

    currentChildQuotes = null;

    currentPage = 1;

    constructor(
        private _bs: BookService,
        private _qs: QuoteService,
        private _cs: ChildService,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.loadingPosts = true;
        this.loadingChildren = true;

        this.store.select('CURRENT_CHILDREN').subscribe(CURRENT_CHILDREN => {
            let cc: any = CURRENT_CHILDREN;

            this.children = cc.children;

            if (this.children.length > 0) {
                this.loadingChildren = false;
            }

        });
    }

    getQuotes(childShortId) {
        if (this.currentChildQuotes === childShortId) {
            return;
        }

        this._qs.getPost(childShortId).subscribe(res => {
            this.posts = res.posts;
            this.loadingPosts = false;
            this.currentChildQuotes = childShortId;
        });
    }

    nextPage() {
        if (this.currentPage >= 20) {
            this.currentPage = 20;
            return;
        }

        this.currentPage++;
    }

    previousPage() {
        if (this.currentPage <= 1) {
            this.currentPage = 1;
            return;
        }

        this.currentPage--;
    }

}
