import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import * as ApplicationUIActions from '../../../../../ngrx-state/actions/application-ui.action';

@Component({
    selector: 'scrblr-quick-start',
    templateUrl: './quick-start.component.html',
    styleUrls: ['./quick-start.component.scss']
})
export class QuickStartComponent implements OnInit {

    @Output('doneLoading') doneLoading = new EventEmitter<boolean>();
    @Output('closeQuickStart') closeQuickStart = new EventEmitter<boolean>();

    userName = '';

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe((CURRENT_USER: any) => {
            this.userName = CURRENT_USER.user.first_name;
        });

        setTimeout(() => {
            console.log('done loading quick start');
            this.doneLoading.emit(true);
        }, 300);
    }

    openNewChild() {
        this.closeQuickStart.emit(true);
        this.store.dispatch(new ApplicationUIActions.AddNewChildActive({addingNewChild: true}));
    }
}
