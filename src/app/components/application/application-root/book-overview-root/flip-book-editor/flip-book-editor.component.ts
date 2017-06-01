import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

import { QuoteService } from '../../../../../services/application-services/quote.service';
import { BookService } from '../../../../../services/application-services/book.service';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

import { Store } from '@ngrx/store';

import * as FlipBookActions from '../../../../../ngrx-state/actions/flip-book.action';

@Component({
    selector: 'scrblr-flip-book-editor',
    templateUrl: './flip-book-editor.component.html',
    styleUrls: [
        './flip-book-editor.component.scss',
        './sidebar.scss',
        './flipbook-preview.scss',
        './front-page.scss',
        './save-modal.scss'
    ]
})
export class FlipBookEditorComponent implements OnInit, AfterViewInit {

    @Input('configuration') configuration;

    // CLOSE THE EDITOR EVENT
    @Output('closeEditorEvent') closeEditorEvent = new EventEmitter<Boolean>();
    /////////////////////////

    // CONFIG
    _postCfg = API_ROUTES.application.posts;
    ///////////

    // state and http stuff
    book;
    children;
    posts;
    ///////////////////////

    // SIDEBAR STUFF
    currentChildPosts = [];
    //////////////////

    // DEFAULT COVERS
    covers = [
        'flip-covers-01.png',
        'flip-covers-02.png',
        'flip-covers-03.png',
        'flip-covers-04.png',
        'flip-covers-05.png',
        'flip-covers-06.png',
        'flip-covers-07.png',
        'flip-covers-08.png',
        'flip-covers-09.png',
        'flip-covers-10.png'
    ];
    //////////////////

    // model for saving book.
    bookModel = {
        cover_preset: '',
        title: 'My Book',
        book: [] // CHECK THIS
    };

    isSaved = false; // book saved
    isFailed = false;
    userIsSaving = false;
    ////////////////////////

    // current page stuff
    currentPage = 0;
    maxPages = 10;
    previousPageIndex = null;
    /////////////////////

    // stuff for sidebar
    currentChildQuotes = null; // short id of the current child that is showing quotes.
    ////////////////////

    // to show the right view of the book. 2 quotes or 1 story + image.
    isMemoryBoolean;
    //////////////////////////////////////////////////////////////////

    // ARRAY THAT HOLD THE CURRENT IMAGES FOR PAGE LEFT AND RIGHT.
    currentImages = [];
    /////////////////////////////////////////////////////////////

    // SIDEBAR
    selectedTool = 'cover';
    /////////////////

    constructor(
        private _qs: QuoteService,
        private _bs: BookService,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.bookModel.cover_preset = (this.configuration.cover_preset) ? this.configuration.cover_preset : 'flip-covers-01.png';
        this.bookModel.title = (this.configuration.title) ? this.configuration.title : 'My Book';


        this.store.select('FLIP_BOOK').subscribe((FLIP_BOOK: any) => {

            this.book = FLIP_BOOK.book;
            this.posts = FLIP_BOOK.posts;

            if (this.currentPage !== 0) {
                this.isMemoryBoolean = this.isMemory(this.book, this.currentPage);
                this.currentImages = this.setCurrentImageArray(this.currentImages, this.book, this.currentPage);
            }

            if (this.selectedTool !== 'cover') {
                this.currentChildPosts = [];
                this.posts.forEach((item, key) => {
                    if (item.child.short_id === this.selectedTool) {
                        this.currentChildPosts.push(item);
                    }
                });
            }
        });

        this.store.select('CURRENT_CHILDREN').subscribe(CHILDREN => {
            let c: any = CHILDREN;
            this.children = c.children;
        });

    }

    ngAfterViewInit() { }

    // GENERAL PURPOSE STUFF
    setCurrentImageArray(currentImages, book, currentPage) {
        currentImages = [];

        book[currentPage - 1].forEach(post => {
            if (Object.keys(post).length !== 0 && post.constructor === Object) {
                currentImages.push(
                    API_ROUTES.baseUrl + this._postCfg.imageBaked(post.child.short_id, post.short_id, post.img_baked_url_id)
                );
            } else {
                currentImages.push(null);
            }
        });

        return currentImages;
    }

    makePostUrl(childShortId, quoteShortId, imgBakedUrlId) {
        return API_ROUTES.baseUrl + this._postCfg.imageBaked(childShortId, quoteShortId, imgBakedUrlId);
    }

    isMemory(book, currentPageNumber) {
        let i = 0;

        for (i = 0; i < 2; i++) {
            if (book[currentPageNumber - 1][i].is_memory === 1) {
                console.log('boolean is memory', true);
                return true;
            } else {
                console.log('boolean is memory', false);
                return false;
            }
        }

    }

    closeEditor() {
        this.closeEditorEvent.emit(true);
    }

    formatImageLink(childShortId, avatarUrlId) {
        return API_ROUTES.baseUrl + API_ROUTES.application.child.getAvatar(childShortId, avatarUrlId);
    }
    /////////////////////----------------------------

    // EDITOR STUFF----------------------------------
    // Drag and drop data transfer.
    transferDataSuccess($event: any) {
        let dataEvent = {};

        dataEvent = {
            pageIndex: this.currentPage - 1,
            pageSide: 0,
            newPageData: $event.dragData,
            isMemory: $event.dragData.is_memory,
            originalShortId: this.book[this.currentPage - 1].short_id,
        };

        console.log(dataEvent);
        this.store.dispatch(new FlipBookActions.UpdateFlipBookPage(dataEvent));
        this.store.dispatch(new FlipBookActions.RemoveFromFlipBookPostList({ shortId: $event.dragData.short_id }));
    }

    nextPage() {
        if (this.currentPage >= this.maxPages) {
            this.currentPage = this.maxPages;
            return;
        }

        this.currentPage++;

        this.isMemoryBoolean = this.isMemory(this.book, this.currentPage);
        this.currentImages = this.setCurrentImageArray(this.currentImages, this.book, this.currentPage);
    }

    previousPage() {
        if (this.currentPage <= 0) {
            this.currentPage = 0;
            return;
        }

        this.currentPage--;

        if (this.currentPage !== 0) {
            this.isMemoryBoolean = this.isMemory(this.book, this.currentPage);
            this.currentImages = this.setCurrentImageArray(this.currentImages, this.book, this.currentPage);
        }

    }

    selectCover(cover) {
        this.bookModel.cover_preset = cover;

        if (this.currentPage !== 0) {
            this.previousPageIndex = this.currentPage;
            this.currentPage = 0;
        }
    }

    changeTool(tool) {
        this.selectedTool = tool;

        if (this.previousPageIndex !== null) {
            this.currentPage = this.previousPageIndex;

            this.previousPageIndex = null;
        }

        if (tool !== 'cover') {
            this.currentChildPosts = [];
            this.posts.forEach((item, key) => {
                if (item.child.short_id === tool) {
                    this.currentChildPosts.push(item);
                }
            });
        }
    }

    returnToPreviousPage() {
        this.currentPage = this.previousPageIndex;

        this.previousPageIndex = null;
    }

    removeCurrentPage(pageIndex, pageSide, shortId) {
        this.store.dispatch(new FlipBookActions.RemoveFromFlipBook({ pageIndex: pageIndex, pageSide: pageSide }));
        this.store.dispatch(new FlipBookActions.AddToFlipBookPostList({ shortId: shortId }));
    }

    saveBook(bookModel, book) {
        bookModel.book = book;
        this._bs.saveBook(bookModel).subscribe(res => {
            console.log(res);
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
            console.log(res);
            this.isSaved = true;
            this.isFailed = false;
        }, err => {
            this.isSaved = false;
            this.isFailed = true;
        });
    }

    openModal() {
        this.userIsSaving = true;
    }

    closeModal() {
        this.userIsSaving = false;
        this.isSaved = false;
        this.isFailed = false;
    }
}
