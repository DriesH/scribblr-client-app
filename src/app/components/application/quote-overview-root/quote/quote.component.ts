import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  @Input('quoteData') quoteData;

  constructor() { }

  ngOnInit() {
  }

}
