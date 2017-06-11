import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { APP_CONFIG } from '../../../../../_config/app.config';

import { DropzoneService } from '../../../../../services/dropzone.service';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { PexelsapiService } from '../../../../../services/application-services/pexelsapi.service';

import * as quoteActions from '../../../../../ngrx-state/actions/quote.action';

declare var Aviary: any;

@Component({
    selector: 'scrblr-edit-story',
    templateUrl: './edit-story.component.html',
    styleUrls: ['./edit-story.component.scss'],
    providers: [DropzoneService]

})
export class EditStoryComponent implements OnInit, OnDestroy, AfterViewInit {

    csdkImageEditor;

    canvasLoading = false;

    aviaryLink: string = null;

    childShortId: String;

    storyModel = {
        story: null,
        img_baked: null
    };

    storyData: FormData = new FormData();

    imageLoading = false;

    hideUserImage = false;

    presetPickerActive = true;

    notDropped = true;

    isUploading = false;

    //////////////
    /// PEXELS ///
    //////////////
    pexelsLoading;
    oldSearchQuery;
    pexelsImgs;
    //////////////

    child;

    @ViewChild('presetImg') presetImg: ElementRef;
    @ViewChild('userImg') userImg: ElementRef;
    @ViewChild('previewCanvas') previewCanvas: ElementRef;
    @ViewChild('dropzone') dropzone: ElementRef;
    @ViewChild('aviaryImage') aviaryImage: ElementRef;
    @ViewChild('imgClickUpload') imgClickUpload: ElementRef;

    constructor(
        private _dz: DropzoneService,
        private _qs: QuoteService,
        private _pas: PexelsapiService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>,
        private location: Location
    ) { }

    ngOnInit() {
        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: APP_CONFIG.aviarySettings,
            onSave: this.saveToAviary.bind(this),
            onError: this.errorSavingToAviary,
            onClose: this.onAviaryClose.bind(this)
        });

        this.pexelsLoading = true;

        this._pas.getMostPopular().subscribe(res => {
            this.pexelsLoading = false;
            this.pexelsImgs = res.photos;
            this.storyModel.img_baked = this.pexelsImgs[0].src.large;
        });

        this.route.parent.params.subscribe(params => {
            this.childShortId = params.short_id_child;
        });

        this.store.select('CURRENT_CHILDREN').subscribe((CURRENT_CHILDREN: any) => {
            CURRENT_CHILDREN.children.forEach((child, key) => {
                if (child.short_id === this.childShortId) {
                    this.child = child;
                }
            });
        });
    }

    ngAfterViewInit() {
        this.attachEventListeners();
        console.log('After init:', this.userImg);
    }

    attachEventListeners() {
        document.addEventListener('keyup', this.closeOverlay.bind(this));
    }

    removeEventListeners() {
        document.removeEventListener('keyup', this.closeOverlay.bind(this));
    }

    closeOverlay(event) {
        event.preventDefault();
        if (event.key === 'Escape') {
            this.location.back();
        }
    }

    ngOnDestroy() {
        if (!this.presetPickerActive) {
            this._dz.destroy(this.dropzone.nativeElement);
        }

        this.removeEventListeners();
    }

    imageLoaded() {
        this.imageLoading = false;
    }

    addNewStory(childShortId, storyModel) {
        if (this.isUploading) {
            return;
        }

        this.isUploading = true;
        this.storyData.set('story', storyModel.story);
        this.storyData.set('img_baked', storyModel.img_baked);

        this._qs.newStory(childShortId, this.storyData).subscribe(res => {
            this.isUploading = false;
            this.dispatchNewStory(res.story);
        });
    }

    dispatchNewStory(newStory) {
        this.store.dispatch(new quoteActions.NewQuote({ newPost: newStory }));
        this.router.navigate(['application', 'overview', this.childShortId]);
    }

    /**
     * Start the photo-editor
     * @param e: Event
     */
    startAviary(e) {
        console.log(e);

        this.imageLoading = true;
        this.notDropped = false;

        this.csdkImageEditor.launch({
            image: this.userImg.nativeElement.id
        });
        console.log('startAviary');
    }

    /**
     * Save the image to S3 bucket.
     * @param imageID: String
     * @param newURL; String
     */
    saveToAviary(imageID, newURL) {
        this.hideUserImage = true;
        console.log(this.hideUserImage);
        this.aviaryImage.nativeElement.src = newURL;
        this.storyModel.img_baked = newURL;

        this.csdkImageEditor.close();
    }

    /**
     * Error when saving to aviary.
     * @param errorObj: Object
     */
    errorSavingToAviary(errorObj) {
        console.log('erroooor');
    }

    /**
     * Fired when aviary closes.
     * @param isDirty: Boolean
     */
    onAviaryClose(isDirty) {
    }

    toggleImageMode() {
        this.presetPickerActive = !this.presetPickerActive;

        this.imageLoading = false;
        this.notDropped = true;

        if (!this.presetPickerActive) {
            this._dz.init(this.dropzone.nativeElement, this.userImg.nativeElement);
        } else {
            this._dz.destroy(this.dropzone.nativeElement);
        }
    }

    changeImage(e, original_url) {
        e.preventDefault();
        this.imageLoading = true;
        console.log('changeImage');
        this.storyModel.img_baked = original_url;
    }

    searchPexelsApi(event, searchQuery) {
        if (event.key === 'Enter') {
            this.pexelsLoading = true;
            this.oldSearchQuery = searchQuery;
            this._pas.searchImages(searchQuery).subscribe(res => {
                console.log(res);
                this.pexelsImgs = res.photos;
                this.pexelsLoading = false;
            });
        } else if (event.type === 'click') {
            this.pexelsLoading = true;
            this._pas.searchImages(searchQuery).subscribe(res => {
                console.log(res);
                this.pexelsImgs = res.photos;
                this.pexelsLoading = false;
            });
        }
    }

    clickToUpload(e) {
        e.preventDefault();
        e.stopPropagation();
        this.imgClickUpload.nativeElement.click();
    }

    getFileData() {
        let fr = new FileReader();

        if (this.imgClickUpload.nativeElement.files.length) {
            fr.readAsDataURL(this.imgClickUpload.nativeElement.files[0]);
        }

        fr.addEventListener('load', () => {
            this.userImg.nativeElement.src = fr.result;
        });
    }

}
