import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

import { Store } from '@ngrx/store';

@Component({
    selector: 'scrblr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe((CURRENT_USER: any) => {
            this.auth.getUser();
        });
    }
}
