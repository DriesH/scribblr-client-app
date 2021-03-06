import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';

import { ChildService } from '../../../services/application-services/child.service';

import { NotificationConfig } from './notifications/config';

import { Store } from '@ngrx/store';

import * as ChildActions from '../../../ngrx-state/actions/child.action';
import * as ApplicationUIActions from '../../../ngrx-state/actions/application-ui.action';

import { NewsService } from '../../../services/application-services/news.service';


@Component({
    selector: 'scrblr-application-root',
    templateUrl: './application-root.component.html',
    styleUrls: ['./application-root.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ApplicationRootComponent implements OnInit {

    children;
    currentUser;
    applicationUI;
    currentRoute: String;
    _config = NotificationConfig;

    noChildren = false;

    isHidingSidebar = false;

    unreadNewsCount = 0;

    @ViewChild('quickQuote') quickQuote: ElementRef;

    constructor(
        private _cs: ChildService,
        private store: Store<any>,
        private router: Router,
        private route: ActivatedRoute,
        private _ns: NewsService) { }

    ngOnInit() {
        if (window.innerWidth <= 480) {
            this.isHidingSidebar = true;
        }

        this.store.select('CURRENT_USER').subscribe(CURRENT_USER => {
            // console.log('My state changed in CURRENT_USER');
            this.currentUser = CURRENT_USER;
        });

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            if (CURRENT_CHILDREN.receivedCall) {
                if (CURRENT_CHILDREN.children.length) {
                    this.children = CURRENT_CHILDREN.children;
                    this.noChildren = false;
                } else {
                    this.children = CURRENT_CHILDREN.children;
                    this.noChildren = true;
                }
            }
        });

        this.store.select('APPLICATION_UI').subscribe(APPLICATION_UI => {
            // console.log('My state changed in APPLICATION_UI');
            this.applicationUI = APPLICATION_UI;
        });

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this._ns.getAmoutOfUnread().subscribe(res => this.unreadNewsCount = res.unread_count);
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

        this._ns.getAmoutOfUnread().subscribe(res => this.unreadNewsCount = res.unread_count);

    }

    dispatchChildrenToStore(children) {
        this.children = children;
        this.store.dispatch(new ChildActions.SuccessfullDownloadChildren(children));
    }

    logout() {
        localStorage.removeItem('_token');
        window.location.reload();
    }

    openSideBar() {
        this.isHidingSidebar = !this.isHidingSidebar;
    }

    testFun(event) {
        this.isHidingSidebar = event;
    }
}
