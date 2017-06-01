import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'scrblr-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, OnChanges {

    @Input('src') src: String;
    @Input('pageData') pageData;
    @Input('loadingColor') loadingColor;

    loaded = false;
    isEmpty = false;

    constructor() { }

    ngOnInit() {
        if (this.src === null) {
            this.isEmpty = true;
        }
    }

    ngOnChanges(changes: any) {
        if (this.src === null) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
        }
        this.loaded = false;
    }

    doneLoading() {
        if (this.src === null) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
        }
        this.loaded = true;
    }
}
