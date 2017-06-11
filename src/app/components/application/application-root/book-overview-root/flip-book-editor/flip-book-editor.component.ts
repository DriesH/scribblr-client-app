import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

import { QuoteService } from '../../../../../services/application-services/quote.service';
import { BookService } from '../../../../../services/application-services/book.service';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

import { Store } from '@ngrx/store';

import * as FlipBookActions from '../../../../../ngrx-state/actions/flip-book.action';

import { Router, Event, NavigationStart } from '@angular/router';

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

    // CLOSING MODAL
    isClosing;
    /////////////////////

    // SIDEBAR STUFF
    currentChildPosts = [];
    //////////////////

    // DEFAULT COVERS
    covers = [
        'flip-book-covers-01.png',
        'flip-book-covers-02.png',
        'flip-book-covers-03.png',
        'flip-book-covers-04.png',
        'flip-book-covers-05.png',
        'flip-book-covers-06.png',
        'flip-book-covers-07.png',
        'flip-book-covers-08.png',
        'flip-book-covers-09.png',
        'flip-book-covers-10.png'
    ];
    //////////////////

    // model for saving book.
    bookModel = {
        cover_preset: '',
        title: 'My Flip Book',
        is_flip_over: true,
        book: [] // CHECK THIS
    };

    isSaved = false; // book saved
    isFailed = false;
    userIsSaving = false;
    userIsSavingAndOrdering = false;
    ////////////////////////

    // current page stuff
    currentPage = 0;
    maxPages = 20;
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
        private store: Store<any>,
        private router: Router
    ) { }

    ngOnInit() {
        this.bookModel.cover_preset = (this.configuration.cover_preset) ? this.configuration.cover_preset : 'flip-book-covers-01.png';
        this.bookModel.title = (this.configuration.title) ? this.configuration.title : 'My Flip Book';


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

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.openCloseModal();
            }
        });

    }

    ngAfterViewInit() { }

    // GENERAL PURPOSE STUFF
    setCurrentImageArray(currentImages, book, currentPage) {
        currentImages = [];

        if (Object.keys(book[currentPage - 1]).length !== 0 && book[currentPage - 1].constructor === Object) {
            currentImages.push(
                API_ROUTES.baseUrl +
                this._postCfg.imageBaked(book[currentPage - 1].child.short_id,
                    book[currentPage - 1].short_id,
                    book[currentPage - 1].img_baked_url_id
                )
            );
        } else {
            currentImages.push(null);
        }

        return currentImages;
    }

    makePostUrl(childShortId, quoteShortId, imgBakedUrlId) {
        return API_ROUTES.baseUrl + this._postCfg.imageBaked(childShortId, quoteShortId, imgBakedUrlId);
    }

    isMemory(book, currentPageNumber) {
        if (book[currentPageNumber - 1].is_memory === 1) {
            // console.log('boolean is memory', true);
            return true;
        } else {
            // console.log('boolean is memory', false);
            return false;
        }
    }

    openCloseModal() {
        this.isClosing = true;
    }

    closeCloseModal() {
        this.isClosing = false;
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

        // console.log(dataEvent);
        this.store.dispatch(new FlipBookActions.UpdateFlipBookPage(dataEvent));
        this.store.dispatch(new FlipBookActions.RemoveFromFlipBookPostList({ shortId: $event.dragData.short_id }));
    }

    nextPage() {
        if (this.currentPage >= this.maxPages) {
            this.currentPage = this.maxPages;
            return;
        }

        if (this.currentPage === 0) {
            this.changeTool(this.children[0].short_id);
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

        this.changeTool(this.children[0].short_id);

        this.previousPageIndex = null;
    }

    removeCurrentPage(pageIndex, pageSide, shortId) {
        this.store.dispatch(new FlipBookActions.RemoveFromFlipBook({ pageIndex: pageIndex, pageSide: pageSide }));
        this.store.dispatch(new FlipBookActions.AddToFlipBookPostList({ shortId: shortId }));
    }

    openSaveModal() {
        this.userIsSaving = true;
    }

    openOrderSaveModal() {
        this.userIsSavingAndOrdering = true;
    }

    closeModal() {
        this.userIsSavingAndOrdering = false;
        this.userIsSaving = false;
    }
}
