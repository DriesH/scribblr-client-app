import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import * as ApplicationUIActions from '../../../../ngrx-state/actions/application-ui.action';

@Component({
  selector: 'scrblr-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    @Input('children') children = null;
    @Input('currentUser') currentUser;

    constructor(private store: Store<any>) { }

    ngOnInit() {
    }

    addChild() {
        this.store.dispatch(new ApplicationUIActions.AddNewChildActive({ addingNewChild: true }));
    }

}
