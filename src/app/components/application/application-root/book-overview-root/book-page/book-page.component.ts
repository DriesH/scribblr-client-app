import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'scrblr-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, OnChanges {

    @Input('src') src: String;
    @Input('pageData') pageData;

    loaded = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: any) {
        this.loaded = false;
    }

    doneLoading() {
        this.loaded = true;
    }
}
