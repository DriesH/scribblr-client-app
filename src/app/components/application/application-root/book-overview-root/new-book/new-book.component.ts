import { Component, OnInit } from '@angular/core';

import { BookService } from '../../../../../services/application-services/book.service';
import { QuoteService } from '../../../../../services/application-services/quote.service';
import { ChildService } from '../../../../../services/application-services/child.service';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

import { Store } from '@ngrx/store';

import * as BookActions from '../../../../../ngrx-state/actions/book.action';

@Component({
    selector: 'scrblr-new-book',
    templateUrl: './new-book.component.html',
    styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

    tutorialActive = true;
    currentUser;

    _postCfg = API_ROUTES.application.posts;

    editorActive = false;
    editorType = null;
    isLoadingChildren = false;

    currentChildQuotes = null; // short id of the current child that is showing quotes.

    autoGenerateSuccess = false;

    currentImages = [];

    childModel = {
        shortId: null
    };

    children;

    currentStep = 1;

    constructor(
        private _bs: BookService,
        private _qs: QuoteService,
        private _cs: ChildService,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.isLoadingChildren = true;

        this.store.select('CURRENT_USER').subscribe((CURRENT_USER: any) => {
            this.currentUser = CURRENT_USER.user;

            if (this.currentUser.has_seen_book_tutorial === 1) {
                this.tutorialActive = false;
            } else {
                this.tutorialActive = true;
            }
        });

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            this.children = CURRENT_CHILDREN.children;

            if (this.children.length > 0) {
                this.isLoadingChildren = false;
            }

        });
    }

    setStep(step, type?) {
        if (type) {
            this.editorType = type;
        }

        this.currentStep = step;
    }

    autoGenerate(type) {
        switch (type) {
            case 'book':
                this._bs.autoGenerateNewBook().subscribe(res => {
                    this.store.dispatch(new BookActions.BookDataReceived(res.book));
                    this.store.dispatch(new BookActions.PostsDataReceived(res.all_marked_posts));

                    this.autoGenerateSuccess = true;
                    this.editorActive = true;
                });
                break;
            case 'flip-over':
                break;
        }
    }

    startEmpty(type) {

        switch (type) {
            case 'book':
                let emptyBook = [
                    [{}, {}], // page 1 & 2
                    [{}, {}], // page 3 & 4
                    [{}, {}], // page 5 & 6
                    [{}, {}], // page 7 & 8
                    [{}, {}], // page 9 & 10
                    [{}, {}], // page 11 & 12
                    [{}, {}], // page 13 & 14
                    [{}, {}], // page 15 & 16
                    [{}, {}], // page 17 & 18
                    [{}, {}]  // page 19 & 20
                ];

                this._qs.getAllPosts().subscribe(res => {
                    this.store.dispatch(new BookActions.BookDataReceived(emptyBook));
                    this.store.dispatch(new BookActions.PostsDataReceived(res.posts));

                    this.editorActive = true;
                });
                break;
            case 'flip-over':

                break;

        }



    }

    closeEditor() {
        this.editorActive = false;
        this.currentStep = 1;
    }

}
