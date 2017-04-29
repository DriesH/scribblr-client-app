import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-quote-component',
  templateUrl: './quote-component.component.html',
  styleUrls: ['./quote-component.component.scss']
})
export class QuoteComponentComponent implements OnInit {

  @Input('quoteData') quoteData;

  constructor() { }

  ngOnInit() {
  }

}
