import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { ChildService } from '../../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as childActions from '../../../../ngrx-state/actions/child.action';

@Component({
  selector: 'scrblr-child-overview-root',
  templateUrl: './child-overview-root.component.html',
  styleUrls: ['./child-overview-root.component.scss']
})
export class ChildOverviewRootComponent implements OnInit, AfterViewInit {

    @ViewChild('childContainer') childContainer: ElementRef;

    children;
    showOverlay = false;
    CURRENT_CHILDREN; // from state.

    constructor(private _cs: ChildService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_CHILDREN').subscribe(CURRENT_CHILDREN => {
            this.CURRENT_CHILDREN = CURRENT_CHILDREN;
            console.log('the state changed');
            // check if there are children in the state
            if (this.CURRENT_CHILDREN.children <= 0) {
                this._cs.getAllChildren().subscribe(
                    res => this.dispatchChildrenToState(res),
                    error => this.errorHandler(error));
            } else {
                this.children = this.CURRENT_CHILDREN.children;
                console.log(this.children);
            }
        });
    }

    showNewChildOverlay() {
        this.showOverlay = true;
    }

    ngAfterViewInit() {
        this.addEventListeners();
    }

    private addEventListeners() {
        this.childContainer.nativeElement.addEventListener('mousewheel', this.scrollHorizontal.bind(this));
    }

    private scrollHorizontal(event) {
        if (event.deltaY < 0) {
            this.childContainer.nativeElement.scrollLeft += 100;
            // let counter = 1;
            // let interval = setInterval(() => {
            //     this.childContainer.nativeElement.scrollLeft += 10 * counter;
            //     counter ++;
            //     if ( counter >= 25) {
            //         clearInterval(interval);
            //     }
            // }, 30 / counter);

        } else {
            this.childContainer.nativeElement.scrollLeft -= 100;
        }

    }

    private dispatchChildrenToState(childrenResponse) {
        if (childrenResponse.children.length <= 0) {
            this.children = [];
            return;
        }

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
