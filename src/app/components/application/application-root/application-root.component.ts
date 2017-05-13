import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ChildService } from '../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as ChildActions from '../../../ngrx-state/actions/child.action';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'scrblr-application-root',
    templateUrl: './application-root.component.html',
    styleUrls: ['./application-root.component.scss'],
    animations: [
        trigger('fadeIn', [
            state('*',
                style({
                    opacity: 1,
                })
            ),
            transition(':enter', [
                style({
                    opacity: 0,
                }),
                animate('150ms ease-in')
            ]),
            transition(':leave', [
                animate('250ms ease-out', style({
                    opacity: 0,
                }))
            ])
        ])
    ]
})
export class ApplicationRootComponent implements OnInit {

    children;
    currentUser;
    applicationUI;

    currentUrl: String;

    constructor(
        private _cs: ChildService,
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            console.log('My state changed in CURRENT_USER');
            this.currentUser = CURRENT_USER;
        });

        this.store.select('CURRENT_CHILDREN').subscribe(CURRENT_CHILDREN => {
            console.log('My state changed in CURRENT_CHILDREN');
            const currentChildren: any = CURRENT_CHILDREN;
            if (currentChildren.children) {
                this.children = currentChildren.children;
            }
        });

        this.store.select('APPLICATION_UI').subscribe(APPLICATION_UI => {
            console.log('My state changed in APPLICATION_UI');
            this.applicationUI = APPLICATION_UI;
        });

        this.router.events.subscribe(event => {
            let e: any = event;
            this.currentUrl = e.url;
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
