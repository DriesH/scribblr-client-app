import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'scrblr-quick-access',
    templateUrl: './quick-access.component.html',
    styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent implements OnInit {

    @Input('children') children;

    constructor() { }

    ngOnInit() {
        console.log(this.children);
    }

}
