import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

import { Store } from '@ngrx/store';

import { NotificationConfig } from './components/application/application-root/notifications/config';

@Component({
    selector: 'scrblr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    _config = NotificationConfig;

    constructor(private auth: AuthService, private store: Store<any>) { }

    ngOnInit() {
        this.store.select('CURRENT_USER').subscribe((CURRENT_USER: any) => {
            this.auth.getUser();
        });
    }
}
