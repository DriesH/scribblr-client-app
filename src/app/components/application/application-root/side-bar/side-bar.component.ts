import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scrblr-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    @Input('children') children;

    constructor() { }

    ngOnInit() {
    }

}
