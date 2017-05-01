import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input('childData') childData;

  constructor() { }

  ngOnInit() {
  }

}
