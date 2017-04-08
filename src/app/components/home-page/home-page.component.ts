import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.auth.getUser();
    }
}
