import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { NewsService } from '../../../../../services/application-services/news.service';

@Component({
    selector: 'scrblr-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

    newsArticle;
    articleIsLoading = false;

    constructor(private _ns: NewsService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.articleIsLoading = true;
            this._ns.readArticle(params['news_title']).subscribe(res => {
                this.newsArticle = res.news_item;
                this.articleIsLoading = false;
            });
        });
    }

}
