import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChildService } from '../../../../../services/application-services/child.service';

@Component({
  selector: 'scrblr-child-add-modal',
  templateUrl: './child-add-modal.component.html',
  styleUrls: ['./child-add-modal.component.scss']
})
export class ChildAddModalComponent implements OnInit, OnDestroy {

    childForm = {
        first_name: null,
        last_name: null,
        date_of_birth: null,
        gender: null
    };

    body: NodeListOf<HTMLBodyElement>;

    constructor(private _cs: ChildService) { }

    ngOnInit() {
        this.body = document.getElementsByTagName('body');
        this.body[0].className = 'no-scrolling';
    }

    ngOnDestroy() {
        this.body[0].className = '';
    }

    addNewChild(formData) {
        console.log(formData);
        this._cs.newChild(formData)
            .subscribe(res => {
                console.log(res);
            }, error => {
                console.log(error);
            });
    }

}
