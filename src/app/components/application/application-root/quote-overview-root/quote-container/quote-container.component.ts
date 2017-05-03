import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'scrblr-quote-container',
  templateUrl: './quote-container.component.html',
  styleUrls: ['./quote-container.component.scss']
})
export class QuoteContainerComponent implements OnInit {

  @Output() shortIdEvent: EventEmitter<String> = new EventEmitter();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log('params= ', params);
      });
  }

}
