import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';

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
    @ViewChild('avatarFileInput') avatarFileInput: ElementRef;

    imageData: any;
    cropperSettings: CropperSettings;
    childModel = {
        full_name: null,
        date_of_birth: null,
        gender: null
    };

    childData: FormData = new FormData();
    image: any = new Image();
    isShowingCropper = false;
    avatarError = false;

    makingChild = false;

    constructor(
        private store: Store<any>,
        private _cs: ChildService,
        private router: Router) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 600;
        this.cropperSettings.height = 600;
        this.cropperSettings.croppedWidth = 600;
        this.cropperSettings.croppedHeight = 600;
        this.cropperSettings.canvasWidth = 468;
        this.cropperSettings.canvasHeight = 468;
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.rounded = false;
        this.cropperSettings.cropperClass = 'cropper-canvas-img-cropper-ng';

        this.imageData = {};
    }

    ngOnInit() {
        this.addEventListeners();

        console.log(this.imageData);
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
                this.isShowingCropper = true;
            };

            myReader.readAsDataURL(file);

            this.imageData.fileName = file.name;

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
        if (this.makingChild) {
            return;
        }

        if (this.avatarError) {
            return;
        }

        if (!this.childModel.date_of_birth || !this.childModel.full_name || !this.childModel.gender) {
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

        this.makingChild = true;

        this._cs.newChild(this.childData).subscribe(res => {
            this.dispatchNewChild(res.child);
            this.makingChild = false;
        });
    }

    dispatchNewChild(newChild) {
        this.store.dispatch(new ChildActions.NewChild(newChild));
        this.closeModal();
        this.router.navigate(['application', 'overview', newChild.short_id]);
    }

    openFile(e) {
        e.preventDefault();
        this.avatarFileInput.nativeElement.click();
    }
}
