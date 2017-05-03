import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-child-navigation',
  templateUrl: './child-navigation.component.html',
  styleUrls: ['./child-navigation.component.scss']
})
export class ChildNavigationComponent implements OnInit {

  @Input('children') children;

  constructor() { }

  ngOnInit() {
  }

}
