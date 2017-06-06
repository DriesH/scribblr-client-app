import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { BookService } from '../../../../../services/application-services/book.service';

import { NoScrollService } from '../../../../../services/no-scroll.service';

import { Store } from '@ngrx/store';

import * as FlipBookActions from '../../../../../ngrx-state/actions/flip-book.action';

import { BookEditorConfig } from '../../../../../models/book-editor';


@Component({
    selector: 'scrblr-flip-book-inspector',
    templateUrl: './flip-book-inspector.component.html',
    styleUrls: ['./flip-book-inspector.component.scss']
})
export class FlipBookInspectorComponent implements OnInit, OnDestroy {

    bodyElement;

    editorConfig: BookEditorConfig = {
        cover_preset: null,
        editing: true,
        title: null,
        bookShortId: null
    };

    currentPage = 0;

    editorActive = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _bs: BookService,
        private _nss: NoScrollService,
        private store: Store<any>
    ) { }

    ngOnInit() {
        window.scrollTo(0, 0);

        this.bodyElement = document.getElementById('body-element');

        this._nss.setNoScroll(this.bodyElement);

        this.route.params.subscribe((params: Params) => {
            this._bs.getBook(params['short_id_book']).subscribe(res => {
                this.store.dispatch(new FlipBookActions.FlipBookDataReceived(res.pages));
                this.store.dispatch(new FlipBookActions.FlipBookPostsDataReceived(res.all_marked_posts));

                this.editorConfig.title = res.book.title;
                this.editorConfig.cover_preset = res.book.cover_preset;
                this.editorConfig.bookShortId = params['short_id_book'];
                this.editorActive = true;

            });
        });
    }

    ngOnDestroy() {
        this._nss.removeNoScroll(this.bodyElement);
    }

    closeEditor() {
        this.router.navigate(['application', 'books']);
    }



}
