import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

@Component({
    selector: 'scrblr-latest-posts',
    templateUrl: './latest-posts.component.html',
    styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit, OnDestroy, AfterViewInit {

    latestPostsArray = [];

    @ViewChild('latestPosts') latestPosts: ElementRef;

    @Output('reachedLast') reachedLast = new EventEmitter<boolean>();

    constructor(private _qs: QuoteService) { }

    ngOnInit() {
        this._qs.getLatestPost().subscribe(res => {
            // console.log(res);
            this.latestPostsArray = res.latest_posts;

            if (!this.latestPostsArray.length) {
                this.reachedLast.emit(true);
            }
        });
    }

    ngAfterViewInit() {
        this.addEventListeners();
    }

    ngOnDestroy() {
        this.removeEventListeners();
    }

    addEventListeners() {
        this.latestPosts.nativeElement.addEventListener('mousewheel', this.scrollX.bind(this));
    }

    removeEventListeners() {
        this.latestPosts.nativeElement.removeEventListener('mousewheel', this.scrollX.bind(this));
    }

    scrollX(event: WheelEvent) {
        event.preventDefault();
        if (Math.sign(event.deltaY) > 0) {
            this.latestPosts.nativeElement.scrollLeft += 100;
        } else if (Math.sign(event.deltaY) < 0) {
            this.latestPosts.nativeElement.scrollLeft -= 100;
        }
    }

    makePostUrl(csi, psi, ibui) {
        return API_ROUTES.baseUrl + API_ROUTES.application.posts.imageBaked(csi, psi, ibui);
    }

    reachedLastFn(last) {
        if (last) {
            this.reachedLast.emit(last);
        }
    }
}
