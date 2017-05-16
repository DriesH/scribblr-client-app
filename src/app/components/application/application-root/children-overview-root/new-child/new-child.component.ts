import { Component, OnInit, ViewChild } from '@angular/core';


import { Store } from '@ngrx/store';

import * as ApplicationUIActions from '../../../../../ngrx-state/actions/application-ui.action';
import * as ChildActions from '../../../../../ngrx-state/actions/child.action';

import { ChildService } from '../../../../../services/application-services/child.service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

import { CropperSettings } from 'ng2-img-cropper';

import { dataURItoBlob } from '../../../../../classes/base64toblob';

import { ImageCropperComponent } from 'ng2-img-cropper';

@Component({
    selector: 'scrblr-new-child',
    templateUrl: './new-child.component.html',
    styleUrls: ['./new-child.component.scss'],

})
export class NewChildComponent implements OnInit {

    @ViewChild('cropper') cropper: ImageCropperComponent;

    imageData: any;
    cropperSettings: CropperSettings;
    childModel = {
        full_name: null,
        date_of_birth: null,
        gender: null
    };

    childData: FormData = new FormData();
    image: any = new Image();

    avatarError = false;

    validationMsg = {
        name: {
            required: 'Name is required',
            not_valid: 'Name is not valid'
        },
        gender: {
            required: 'Gender is required',
            not_valid: 'Gender is not valid'
        },
        date_of_birth: {
            required: 'Age is required',
            not_valid: 'Age is not valid'
        },
        avatar: {
            required: null,
            not_valid: 'Picture is not valid'
        }
    };

    constructor(
        private store: Store<any>,
        private _cs: ChildService) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 600;
        this.cropperSettings.height = 600;
        this.cropperSettings.croppedWidth = 600;
        this.cropperSettings.croppedHeight = 600;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 400;
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.rounded = true;

        this.imageData = {};
    }

    ngOnInit() {
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('keyup', this.escBtn.bind(this));
    }

    escBtn(event) {
        if (event.keyCode === 27) {
            this.closeModal();
        }
    }

    closeModal() {
        let quoteInput = document.getElementById('quote');
        try {
            quoteInput.focus();
        } catch (e) {
            console.log('no quoteInput');
        }

        this.store.dispatch(new ApplicationUIActions.AddNewChildActive({ addingNewChild: false }));
    }

    fileChangeListener($event) {
        let file: File = $event.target.files[0];
        this.checkMIMEType(file, success => {
            this.avatarError = false;
            let myReader: FileReader = new FileReader();
            myReader.onloadend = (loadEvent: any) => {
                this.image.src = loadEvent.target.result;
                this.cropper.setImage(this.image);
            };

            myReader.readAsDataURL(file);
        }, error => {
            this.avatarError = true;
        });
    }

    private checkMIMEType(file, done, error) {
        switch (file.type) {
            case 'image/png':
                done();
                break;
            case 'image/jpeg':
            case 'image/jpg':
                done();
                break;
            default:
                error();
                break;
        }
    }

    addNewChild() {
        if (this.avatarError) {
            return;
        }

        let img;
        let ext;

        try {
            img = dataURItoBlob(this.imageData.image);
            ext = img.ext.split('/')[1];
        } catch (e) {
            img = null;
            ext = null;
        }

        this.childData.append('full_name', this.childModel.full_name);
        this.childData.append('gender', this.childModel.gender);
        this.childData.append('date_of_birth', this.childModel.date_of_birth);

        if (img && ext) {
            this.childData.append('avatar', img.image, 'avatar.' + ext);
        }

        this._cs.newChild(this.childData).subscribe(res => this.dispatchNewChild(res.child));
    }

    dispatchNewChild(newChild) {
        this.store.dispatch(new ChildActions.NewChild(newChild));
        this.closeModal();
    }
}
