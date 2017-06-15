import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as ApplicationUIActions from '../../../../../ngrx-state/actions/application-ui.action';


@Component({
    selector: 'scrblr-quick-child-book',
    templateUrl: './quick-child-book.component.html',
    styleUrls: ['./quick-child-book.component.scss']
})
export class QuickChildBookComponent implements OnInit {

    constructor(private store: Store<any>) { }

    ngOnInit() {
    }

    addNewChild() {
        this.store.dispatch(new ApplicationUIActions.AddNewChildActive({ addingNewChild: true }));
    }

}
