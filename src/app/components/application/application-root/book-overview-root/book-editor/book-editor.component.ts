import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

import { DragulaService } from 'ng2-dragula';

import { Store } from '@ngrx/store';

@Component({
  selector: 'scrblr-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit, AfterViewInit {

    @Input('isLoadingPosts') isLoadingPosts;
    @Output('closeEditorEvent') closeEditorEvent = new EventEmitter<Boolean>();

    book;
    children;
    posts;

    _postCfg = API_ROUTES.application.posts;
    currentPage = 1;
    currentPageModel = this.currentPage;
    currentChildQuotes = null; // short id of the current child that is showing quotes.
    maxPages = 10;
    currentImages = [];
    isMemoryBoolean;

    // drag n drop stuff
    isOverLeftPage = false;
    isOverRightPage = false;

    constructor(
        private _qs: QuoteService,
        private dragulaService: DragulaService,
        private store: Store<any>
    ) {
        dragulaService.drag.subscribe((value) => {
            this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe((value) => {
            this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe((value) => {
            this.onOut(value.slice(1));
        });
    }

    private onDrag(args) {
        let [e, el] = args;
        console.log('onDrag: ', e, el);
    }

    private onDrop(args) {
        let [e, el] = args;
        console.log('onDrop: ', e, el);
    }

    private onOver(args) {
        let [e, el, container] = args;
        console.log('onOver ', e, el, container);
    }

    private onOut(args) {
        let [e, el, container] = args;
        console.log('onOut ', e, el, container);
    }

    ngOnInit() {
        this.store.select('BOOK').subscribe(BOOK => {
            let b: any = BOOK;

            this.book = b.book;
            this.posts = b.posts;

            this.isMemoryBoolean = this.isMemory(this.book, this.currentPageModel);
            this.currentImages = this.setCurrentImageArray(this.currentImages, this.book, this.currentPageModel);
        });

        this.store.select('CURRENT_CHILDREN').subscribe(CHILDREN => {
            let c: any = CHILDREN;
            this.children = c.children;
        });

    }

    ngAfterViewInit() {
    }

    getQuotes(childShortId) {
        if (this.currentChildQuotes === childShortId) {
            return;
        }

        this.isLoadingPosts = true;

        this._qs.getPost(childShortId).subscribe(res => {
            this.posts = res.posts;
            this.isLoadingPosts = false;

            this.currentChildQuotes = childShortId;
        });
    }


    nextPage() {
      if (this.currentPage >= this.maxPages) {
          this.currentPage = this.maxPages;
          return;
      }

      this.currentPage++;
      this.currentPageModel = this.currentPage;

      this.isMemoryBoolean = this.isMemory(this.book, this.currentPageModel);
      this.currentImages = this.setCurrentImageArray(this.currentImages, this.book, this.currentPageModel);
    }

    previousPage() {
      if (this.currentPage <= 1) {
          this.currentPage = 1;
          return;
      }

      this.currentPage--;
      this.currentPageModel = this.currentPage;

      this.isMemoryBoolean = this.isMemory(this.book, this.currentPageModel);
      this.currentImages = this.setCurrentImageArray(this.currentImages, this.book, this.currentPageModel);
    }

    setCurrentImageArray(currentImages, book, currentPage) {
        currentImages = [];

        book[currentPage - 1].forEach(post => {
            if (Object.keys(post).length !== 0 && post.constructor === Object) {
                currentImages.push(
                    API_ROUTES.baseUrl + this._postCfg.imageBaked(post.child.short_id, post.short_id, post.img_baked_url_id)
                );
            }
        });

        return currentImages;
    }

    makePostUrl(childShortId, quoteShortId, imgBakedUrlId) {
        return API_ROUTES.baseUrl + this._postCfg.imageBaked(childShortId, quoteShortId, imgBakedUrlId);
    }

    isMemory(book, currentPage) {
        let returnVal;

        book[currentPage - 1].forEach(post => {
            if (Object.keys(post).length === 0 && post.constructor === Object) {
                returnVal = true;
            } else {
                returnVal = false;
            }
        });

        return returnVal;
    }

    closeEditor() {
        this.closeEditorEvent.emit(true);
    }
}
