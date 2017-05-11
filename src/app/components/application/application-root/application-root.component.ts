import { Component, OnInit } from '@angular/core';

import { ChildService } from '../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as ChildActions from '../../../ngrx-state/actions/child.action';

@Component({
    selector: 'scrblr-application-root',
    templateUrl: './application-root.component.html',
    styleUrls: ['./application-root.component.scss']
})
export class ApplicationRootComponent implements OnInit {

    children;
    currentUser;
    applicationUI;

    constructor(private _cs: ChildService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            this.currentUser = CURRENT_USER;
        });

        this.store.select('APPLICATION_UI').subscribe(APPLICATION_UI => {
            this.applicationUI = APPLICATION_UI;
        });

        this._cs.getAllChildren()
            .subscribe(
                res => this.dispatchChildrenToStore(res.children),
                error => this.errorHandler(error));
    }

    dispatchChildrenToStore(children) {
        this.children = children;
        this.store.dispatch(new ChildActions.SuccessfullDownloadChildren(children));
    }

    errorHandler(error) {

    }
}
