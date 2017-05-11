import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'scrblr-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    @Input('children') children;
    @Input('currentUser') currentUser;

    constructor(private store: Store<any>) { }

    ngOnInit() {
    }

}
