import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

@Component({
    selector: 'scrblr-latest-posts',
    templateUrl: './latest-posts.component.html',
    styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit, OnDestroy, AfterViewInit {

    latestPostsArray = [];

    hasLatestPosts = false;

    @Output('reachedLast') reachedLast = new EventEmitter<boolean>();

    constructor(private _qs: QuoteService, private router: Router) { }

    ngOnInit() {
        this._qs.getLatestPost().subscribe(res => {
            this.latestPostsArray = res.latest_posts;

            if (!this.latestPostsArray.length) {
                this.hasLatestPosts = false;
                this.reachedLast.emit(true);
            } else {
                this.hasLatestPosts = true;
            }
        });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }

    makePostUrl(csi, psi, ibui) {
        return API_ROUTES.baseUrl + API_ROUTES.application.posts.imageOriginal(csi, psi, ibui);
    }

    makePostBakedUrl(csi, psi, ibui) {
        return API_ROUTES.baseUrl + API_ROUTES.application.posts.imageBaked(csi, psi, ibui);
    }

    reachedLastFn(last) {
        if (last) {
            this.reachedLast.emit(last);
        }
    }

    goToChild(childShortId) {
        this.router.navigate(['application', 'overview', childShortId]);
    }
}
