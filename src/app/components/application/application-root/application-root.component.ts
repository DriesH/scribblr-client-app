import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ChildService } from '../../../services/application-services/child.service';

import { NotificationConfig } from './notifications/config';

import { Store } from '@ngrx/store';

import * as ChildActions from '../../../ngrx-state/actions/child.action';
import * as ApplicationUIActions from '../../../ngrx-state/actions/application-ui.action';


import { EasterEggService } from '../../../services/easter-egg/easter-egg.service';

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
    providers: [ EasterEggService ],
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
    currentRoute: String;
    _config = NotificationConfig;

    noChildren = false;

    @ViewChild('quickQuote') quickQuote: ElementRef;

    constructor(
        private _cs: ChildService,
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private _ees: EasterEggService) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            // console.log('My state changed in CURRENT_USER');
            this.currentUser = CURRENT_USER;
        });

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            // console.log('My state changed in CURRENT_CHILDREN');
            if (CURRENT_CHILDREN.children.length) {
                this.children = CURRENT_CHILDREN.children;
                this.noChildren = false;
            } else {
                this.children = CURRENT_CHILDREN.children;
                this.noChildren = true;
            }
        });

        this.store.select('APPLICATION_UI').subscribe(APPLICATION_UI => {
            // console.log('My state changed in APPLICATION_UI');
            this.applicationUI = APPLICATION_UI;
        });

        this.router.events.subscribe((event: any) => {
            if (event.state) {
                this.store.dispatch(new ApplicationUIActions.AddNewChildActive({ addingNewChild: false }));
                let e: any = event;
                this.currentRoute = e.url;
            }
        });

        this._cs.getAllChildren()
            .subscribe(res => {
                this.noChildren = false;
                this.dispatchChildrenToStore(res.children);
            });

    }

    dispatchChildrenToStore(children) {
        this.children = children;
        this.store.dispatch(new ChildActions.SuccessfullDownloadChildren(children));
    }

    logout() {
        localStorage.removeItem('_token');
        window.location.reload();
    }
}
