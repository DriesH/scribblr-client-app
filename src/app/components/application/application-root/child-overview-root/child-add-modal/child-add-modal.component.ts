import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ChildService } from '../../../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as childActions from '../../../../../ngrx-state/actions/child.action';

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

    constructor(
        private _cs: ChildService,
        private store: Store<any>,
        private router: Router) { }

    ngOnInit() {
        this.body = document.getElementsByTagName('body');
        this.body[0].className = 'no-scrolling';
    }

    ngOnDestroy() {
        this.body[0].className = '';
    }

    addNewChild(formData) {
        this._cs.newChild(formData)
            .subscribe(res => {
                this.dispatchNewChildToStore(res);
            }, error => {
                console.log(error);
            });
    }

    closeModal(event) {
        this.router.navigate(['/application/children']);
    }


    private dispatchNewChildToStore(newChild) {
        this.store.dispatch(new childActions.NewChild(newChild));
    }



}
