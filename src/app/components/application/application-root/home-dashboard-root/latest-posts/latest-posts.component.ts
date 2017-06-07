import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
    selector: 'scrblr-latest-posts',
    templateUrl: './latest-posts.component.html',
    styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('latestPosts') latestPosts: ElementRef;

    constructor() { }

    ngOnInit() {
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
}
