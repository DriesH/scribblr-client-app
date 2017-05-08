import { Component, OnInit, Input } from '@angular/core';

import { Child } from '../../../../../models/child';

@Component({
  selector: 'scrblr-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

    @Input('childData') childData: Child;

    pictureUrl: String;

    constructor() { }

    ngOnInit() {
        if (this.childData.thumbnail_url_id) {
            this.pictureUrl = 'https://scribblr-dev.local/api/application/children/'
                + this.childData.short_id +
                '/thumbnail/'
                + this.childData.thumbnail_url_id;
        } else {
            this.pictureUrl = '/assets/child-head-test/de-ronny.png';
        }
    }
}
