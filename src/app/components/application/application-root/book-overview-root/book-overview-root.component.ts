import { Component, OnInit } from '@angular/core';

import { BookService } from '../../../../services/application-services/book.service';
import { QuoteService } from '../../../../services/application-services/quote.service';
import { ChildService } from '../../../../services/application-services/child.service';

import { API_ROUTES } from '../../../../_api-routes/api.routes';

import { Store } from '@ngrx/store';

import * as BookActions from '../../../../ngrx-state/actions/book.action';

@Component({
    selector: 'scrblr-book-overview-root',
    templateUrl: './book-overview-root.component.html',
    styleUrls: ['./book-overview-root.component.scss']
})
export class BookOverviewRootComponent implements OnInit {

    _postCfg = API_ROUTES.application.posts;

    editorActive = false;
    isLoadingPosts = false;
    isLoadingChildren = false;

    currentChildQuotes = null; // short id of the current child that is showing quotes.

    autoGenerateSuccess = false;

    currentImages = [];

    childModel = {
        shortId: null
    };

    children;

    constructor(
        private _bs: BookService,
        private _qs: QuoteService,
        private _cs: ChildService,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.isLoadingChildren = true;

        this.store.select('CURRENT_CHILDREN').subscribe(CURRENT_CHILDREN => {
            let cc: any = CURRENT_CHILDREN;

            this.children = cc.children;

            if (this.children.length > 0) {
                this.isLoadingChildren = false;
            }

        });
    }

    getQuotes(childShortId) {
        if (this.currentChildQuotes === childShortId) {
            return;
        }

        this.isLoadingPosts = true;

        this._qs.getPost(childShortId).subscribe(res => {
            this.store.dispatch(new BookActions.PostsDataReceived(res.posts));

            this.isLoadingPosts = false;

            this.currentChildQuotes = childShortId;
        });
    }

    autoGenerate() {
        this._bs.autoGenerateNewBook().subscribe(res => {

            this.store.dispatch(new BookActions.BookDataReceived(res.book));

            this.autoGenerateSuccess = true;
            this.editorActive = true;
        });

        this.getQuotes(this.children[0].short_id);
    }

    closeEditor() {
        this.editorActive = false;
    }

}
