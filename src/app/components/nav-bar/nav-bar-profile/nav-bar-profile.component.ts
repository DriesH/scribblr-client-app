import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../models/user';

@Component({
    selector: 'scrblr-nav-bar-profile',
    templateUrl: './nav-bar-profile.component.html',
    styleUrls: ['./nav-bar-profile.component.scss']
})
export class NavBarProfileComponent implements OnInit {

    @Input('currentUser') currentUser: User;

    constructor() { }

    ngOnInit() {
    }

}
