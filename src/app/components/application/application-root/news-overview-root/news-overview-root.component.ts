import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../../../services/application-services/news.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
    selector: 'scrblr-news-overview-root',
    templateUrl: './news-overview-root.component.html',
    styleUrls: [
        './news-overview-root.component.scss',
        './news.media.scss'
    ]
})
export class NewsOverviewRootComponent implements OnInit {

    news;
    newsIsLoading = false;
    showNewsArticle = false;

    constructor(
        private _ns: NewsService,
        private router: Router
    ) { }

    ngOnInit() {
        let regExpRouter;

        this.newsIsLoading = true;

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this._ns.getAllNews()
                    .subscribe(res => {
                        this.news = res.news;
                        this.newsIsLoading = false;
                    });

                regExpRouter = event.url.match(/\/application\/news\/article/g);
                if (regExpRouter && regExpRouter[0] === '/application/news/article') {
                    this.showNewsArticle = true;
                } else {
                    this.showNewsArticle = false;
                }
            }
        });
    }
}
