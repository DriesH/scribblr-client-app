import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ChildService } from '../../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as childActions from '../../../../ngrx-state/actions/child.action';

import { Child } from '../../../../models/child';

@Component({
  selector: 'scrblr-child-overview-root',
  templateUrl: './child-overview-root.component.html',
  styleUrls: ['./child-overview-root.component.scss']
})
export class ChildOverviewRootComponent implements OnInit {

    @ViewChild('childContainer') childContainer: ElementRef;

    children: Array<Child>;
    showOverlay = false;
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

    showNewChildOverlay() {
        this.showOverlay = true;
    }

    private dispatchChildrenToState(childrenResponse) {
        if (childrenResponse.children.length <= 0) {
            this.children = [];
            return;
        }

        this.children = childrenResponse.children;
        this.store.dispatch(new childActions.SuccessfullDownloadChildren(this.children));
    }

    // TODO: Make seperate error handler.
    private errorHandler(error) {
        switch (error) {
            case 401: {
                console.log('Unauthorized');
            }
        }
    }
}
