import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ChildService } from '../../../../../services/application-services/child.service';

import { Store } from '@ngrx/store';

import * as childActions from '../../../../../ngrx-state/actions/child.action';

import { HeaderOptions } from '../../../../../models/header-options';

import { Child } from '../../../../../models/child';

@Component({
    selector: 'scrblr-child-add-modal',
    templateUrl: './child-add-modal.component.html',
    styleUrls: ['./child-add-modal.component.scss']
})
export class ChildAddModalComponent implements OnInit, OnDestroy {

    @ViewChild('newChildForm') newChildForm: ElementRef;
    @ViewChild('image') image: ElementRef;

    childForm = {
        first_name: null,
        last_name: null,
        date_of_birth: null,
        gender: null
    };

    childFormData: FormData = new FormData();

    headers: Array<HeaderOptions> = [
        { prop: 'Content-Type', value: 'multipart/form-data' }
    ];

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

    addNewChild() {
        this.childFormData.append('first_name',    this.childForm.first_name);
        this.childFormData.append('last_name',     this.childForm.last_name);
        this.childFormData.append('date_of_birth', this.childForm.date_of_birth);
        this.childFormData.append('gender',        this.childForm.gender);

        this._cs.newChild(this.childFormData, this.headers)
            .subscribe(res => {
                this.dispatchNewChildToStore(res.child);
                console.log(res.child);
            }, error => {
                console.log(error);
            });
    }

    imageAdded(e) {
        let files: FileList = e.srcElement.files;
        this.childFormData.append('thumbnail', files[0], files[0].name);
    }

    closeModal(e) {
        this.router.navigate(['/application/children']);
    }

    private dispatchNewChildToStore(newChild: Child) {
        this.store.dispatch(new childActions.NewChild(newChild));
    }
}
