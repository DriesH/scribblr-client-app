import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../../../services/application-services/news.service';

@Component({
    selector: 'scrblr-news-overview-root',
    templateUrl: './news-overview-root.component.html',
    styleUrls: ['./news-overview-root.component.scss']
})
export class NewsOverviewRootComponent implements OnInit {

    news;
    newsIsLoading = false;

    constructor(
        private _ns: NewsService,
    ) { }

    ngOnInit() {
        this.newsIsLoading = true;

        this._ns.getAllNews()
            .subscribe(res => {
                console.log(res);
                this.news = res.news;
                this.newsIsLoading = false;
            });
    }

}
