import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { ActivatedRoute, Params } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { ChildService } from '../../../../../services/application-services/child.service';

import * as ChildActions from '../../../../../ngrx-state/actions/child.action';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { dataURItoBlob } from '../../../../../classes/base64toblob';

@Component({
    selector: 'scrblr-edit-child',
    templateUrl: './edit-child.component.html',
    styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent implements OnInit {

    @ViewChild('cropper') cropper: ImageCropperComponent;
    @ViewChild('avatarFileInput') avatarFileInput: ElementRef;

    cropperSettings: CropperSettings;

    childModel = {
        full_name: null,
        date_of_birth: null,
        gender: null
    };

    childName123 = '';
    canDelete = false;

    image: any = new Image();
    isShowingCropper = false;
    avatarError = false;
    imageData: any;

    childData: FormData = new FormData();

    childShortId;

    editingChild = false;

    isDeletingChild = false;

    constructor(
        private store: Store<any>,
        private route: ActivatedRoute,
        private _cs: ChildService,
        private router: Router,
        private _ns: NotificationsService
    ) {
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

    editChild() {
        if (this.editingChild) {
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
        this.childData.append('date_of_birth', this.childModel.date_of_birth);
        this.childData.append('gender', this.childModel.gender);

        if (img && ext) {
            this.childData.append('avatar', img.image, 'avatar.' + ext);
        }

        this.editingChild = true;

        this._cs.editChild(this.childShortId, this.childData).subscribe(res => {
            this.editingChild = false;
            this.store.dispatch(new ChildActions.EditChild({ updatedChild: res.child }));
            this.router.navigate(['application']);
        }, err => {
            this.editingChild = false;
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

    openFile(e) {
        e.preventDefault();
        e.stopPropagation();
        this.avatarFileInput.nativeElement.click();
    }
}
