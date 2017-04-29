import { Component, OnInit } from '@angular/core';

import { ChildService } from '../../../services/application-services/child.service';

@Component({
  selector: 'scrblr-child-overview-root',
  templateUrl: './child-overview-root.component.html',
  styleUrls: ['./child-overview-root.component.scss']
})
export class ChildOverviewRootComponent implements OnInit {

    children;

    constructor(private _cs: ChildService) { }

    ngOnInit() {
        this._cs.getAllChildren()
          .subscribe(res => {
              this.children = res.children;
              console.log(this.children);
          }, error => {
              switch ( error ) {
                  case 401: {
                      console.log('unauthorized');
                  }
              }
          });
    }
}
