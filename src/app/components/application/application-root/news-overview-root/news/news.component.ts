import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() newsData;
  isShowingMessage = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMessage() {
    this.isShowingMessage = !this.isShowingMessage;
  }

}
