import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  @Input('childData') childData;

  constructor() { }

  ngOnInit() {
  }

}
