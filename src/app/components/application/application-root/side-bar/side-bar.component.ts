import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import * as ApplicationUIActions from '../../../../ngrx-state/actions/application-ui.action';

import { API_ROUTES } from '../../../../_api-routes/api.routes';

import { NewsService } from '../../../../services/application-services/news.service';

@Component({
    selector: 'scrblr-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: [
        './side-bar.component.scss',
        './side-bar.media.scss'
    ]
})
export class SideBarComponent implements OnInit {

    @Input('children') children = null;
    @Input('noChildren') noChildren;
    @Input('currentUser') currentUser;
    @Input('isHidingSidebar') isHidingSidebar;
    @Input('unreadNewsCount') unreadNewsCount = 0;
    @Output('isHidingSidebarChange') isHidingSidebarChange= new EventEmitter<boolean>();

    cart;

    constructor(private store: Store<any>, private _ns: NewsService) { }

    ngOnInit() {
        this.store.select('CART').subscribe((CART: any) => {
            this.cart = CART.items_in_cart;
        });

    }

    addChild() {
        this.closeSideBar();
        this.store.dispatch(new ApplicationUIActions.AddNewChildActive({ addingNewChild: true }));
    }

    formatImageLink(childShortId, avatarUrlId) {
        return API_ROUTES.baseUrl + API_ROUTES.application.child.getAvatar(childShortId, avatarUrlId);
    }

    closeSideBar() {
        if (window.innerWidth >= 480) {
            return;
        }
        this.isHidingSidebar = true;
        this.isHidingSidebarChange.emit(this.isHidingSidebar);
        console.log('Clicked in sidebar', this.isHidingSidebar);
    }

}
