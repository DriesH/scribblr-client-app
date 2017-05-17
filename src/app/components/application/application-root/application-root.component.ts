import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ChildService } from '../../../services/application-services/child.service';

import { NotificationConfig } from './notifications/config';

import { Store } from '@ngrx/store';

import * as ChildActions from '../../../ngrx-state/actions/child.action';

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

    @ViewChild('quickQuote') quickQuote: ElementRef;

    constructor(
        private _cs: ChildService,
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private _ees: EasterEggService) { }

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
            this.currentRoute = e.url;
        });

        this._cs.getAllChildren()
            .subscribe(res => this.dispatchChildrenToStore(res.children));

        // this.attachListeners();
    }

    // attachListeners() {
    //     window.addEventListener('keydown', this._ees.easterEgg);
    // }

    dispatchChildrenToStore(children) {
        this.children = children;
        this.store.dispatch(new ChildActions.SuccessfullDownloadChildren(children));
    }
}
