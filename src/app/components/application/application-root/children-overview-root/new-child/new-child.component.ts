import { Component, OnInit } from '@angular/core';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition
// } from '@angular/animations';

import { Store } from '@ngrx/store';

import * as ApplicationUIActions from '../../../../../ngrx-state/actions/application-ui.action';

import { ChildService } from '../../../../../services/application-services/child.service';

import { CropperSettings } from 'ng2-img-cropper';

import { dataURItoBlob } from '../../../../../classes/base64toblob';

@Component({
  selector: 'scrblr-new-child',
  templateUrl: './new-child.component.html',
  styleUrls: ['./new-child.component.scss'],
  // animations: [
  //   trigger('heroState', [
  //     transition('* => in', [
  //       style({ opacity: '1' }),
  //       animate(100)]),
  //     transition('in => *', [
  //       style({ opacity: '0' }),
  //       animate(100)])
  //   ])
  // ]
})
export class NewChildComponent implements OnInit {

    imageData: any;
    cropperSettings: CropperSettings;
    childModel = {
        full_name: null,
        date_of_birth: null,
        gender: null
    };
    childData: FormData = new FormData();

    constructor(private store: Store<any>, private _cs: ChildService) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 600;
        this.cropperSettings.height = 600;
        this.cropperSettings.croppedWidth = 600;
        this.cropperSettings.croppedHeight = 600;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 400;

        this.imageData = {};
    }

    ngOnInit() {
    }

    closeModal() {
        this.store.dispatch(new ApplicationUIActions.AddNewChildActive({ addingNewChild: false }));
    }

    addNewChild() {
        this.childData.append('full_name', this.childModel.full_name);
        this.childData.append('gender', this.childModel.gender);
        this.childData.append('date_of_birth', this.childModel.date_of_birth);
        this.childData.append('avatar', dataURItoBlob(this.imageData.image));

        this._cs.newChild(this.childData)
            .subscribe(res => {
              console.log(res);
            }, error => {

            });
    }

}
