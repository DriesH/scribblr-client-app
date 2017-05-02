import { Component, OnInit } from '@angular/core';

import { ChildService } from '../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as childActions from '../../../ngrx-state/actions/child.action';

@Component({
  selector: 'scrblr-child-overview-root',
  templateUrl: './child-overview-root.component.html',
  styleUrls: ['./child-overview-root.component.scss']
})
export class ChildOverviewRootComponent implements OnInit {

    children;
    CURRENT_CHILDREN; // from state.

    constructor(private _cs: ChildService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_CHILDREN').subscribe(CURRENT_CHILDREN => {
            this.CURRENT_CHILDREN = CURRENT_CHILDREN;

            // check if there are children in the state
            if (this.CURRENT_CHILDREN.children <= 0) {
                this._cs.getAllChildren().subscribe(
                    res => this.dispatchChildrenToState(res),
                    error => this.errorHandler(error));
            } else {
                this.children = this.CURRENT_CHILDREN.children;
            }
        });
    }

    private dispatchChildrenToState(childrenResponse) {
        this.children = childrenResponse.children;
        this.store.dispatch(new childActions.SuccessfullDownloadChildren(this.children));
    }

    private errorHandler(error) {
        switch (error) {
            case 401: {
                console.log('unauthorized');
            }
        }
    }
}
