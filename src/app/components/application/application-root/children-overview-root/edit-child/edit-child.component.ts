import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { ActivatedRoute, Params } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { ChildService } from '../../../../../services/application-services/child.service';

import * as ChildActions from '../../../../../ngrx-state/actions/child.action';


@Component({
    selector: 'scrblr-edit-child',
    templateUrl: './edit-child.component.html',
    styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent implements OnInit {

    childModel = {
        full_name: null,
        date_of_birth: null,
        gender: null
    };

    childName123 = '';
    canDelete = false;


    childData: FormData = new FormData();

    childShortId;

    isDeletingChild = false;

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private _cs: ChildService,
        private router: Router,
        private _ns: NotificationsService,) { }

    ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.childShortId = params['short_id_child'];
        });

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            CURRENT_CHILDREN.children.forEach((child, key) => {
                if (child.short_id === this.childShortId) {
                    this.childModel.full_name = child.full_name;
                    this.childModel.date_of_birth = child.date_of_birth;
                    this.childModel.gender = child.gender;
                }
            });
        });
    }

    editChild() {
        this.childData.append('full_name', this.childModel.full_name);
        this.childData.append('date_of_birth', this.childModel.date_of_birth);
        this.childData.append('gender', this.childModel.gender);

        this._cs.editChild(this.childShortId, this.childData).subscribe(res => {
            this.store.dispatch(new ChildActions.EditChild({ updatedChild: res.child }));
            this.router.navigate(['application']);
        });

    }

    removeChild(childShortId) {
        this.isDeletingChild = true;
        this._cs.deleteChild(childShortId).subscribe(res => {
            this.store.dispatch(new ChildActions.DeleteChild({ childShortId: this.childShortId }));
            setTimeout(() => {
                this.isDeletingChild = false;
                this.router.navigate(['application', 'home']);
                this._ns.success('Successfully deleted child', 'We have successfully deleted your child');
            }, 500);
        });
    }

    checkName() {
        if (this.childModel.full_name === this.childName123) {
            this.canDelete = true;
        } else {
            this.canDelete = false;
        }
    }

}
