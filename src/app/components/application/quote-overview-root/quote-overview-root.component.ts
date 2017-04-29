import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../../services/application-services/quote.service';


@Component({
  selector: 'scrblr-quote-overview-root',
  templateUrl: './quote-overview-root.component.html',
  styleUrls: ['./quote-overview-root.component.scss']
})
export class QuoteOverviewRootComponent implements OnInit {

    quotes;

    constructor(private _qs: QuoteService) { }

    ngOnInit() {
        this._qs.getAllQuotes()
          .subscribe(res => {
              this.quotes = res.quotes;
          }, error => {
              switch (error) {
                  case 401: {
                      console.log('unauthorized');
                  }
              }
          });
    }

}
