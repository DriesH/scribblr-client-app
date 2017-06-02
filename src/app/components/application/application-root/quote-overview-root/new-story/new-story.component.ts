import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { APP_CONFIG } from '../../../../../_config/app.config';

import { DropzoneService } from '../../../../../services/dropzone.service';

import { QuoteService } from '../../../../../services/application-services/quote.service';


declare var Aviary: any;

@Component({
    selector: 'scrblr-new-story',
    templateUrl: './new-story.component.html',
    styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent implements OnInit {

    csdkImageEditor;

    canvasLoading = false;

    aviaryLink: string = null;

    memoryModel = {
        story: null,
        font: 'Calibri',
        selectedPreset: '/assets/preset-imgs/guinea_pig.jpg'
    };

    @ViewChild('presetImg') presetImg: ElementRef;
    @ViewChild('userImg') userImg: ElementRef;
    @ViewChild('previewCanvas') previewCanvas: ElementRef;
    @ViewChild('dropzone') dropzone: ElementRef;

    constructor(private _qs: QuoteService, private store: Store<any>) { }

    ngOnInit() {
        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: APP_CONFIG.aviarySettings,
            onSave: this.saveToAviary.bind(this),
            onError: this.errorSavingToAviary,
            onClose: this.onAviaryClose.bind(this)
        });
    }

    addNewStory(childShortId, storyData) {
        this._qs.newStory(childShortId, storyData).subscribe(res => {

        });
    }

    /**
     * Start the photo-editor
     * @param e: Event
     */
    startAviary(e) {
        console.log(e);

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
        console.log('newURL: ', newURL);
        console.log('imageID: ', imageID);
        this.canvasLoading = true;

        let img = new Image();

        img.src = newURL;
        img.setAttribute('crossOrigin', 'anonymous');

        this.aviaryLink = newURL;

        img.onload = () => {
            // this.initCanvas(img, this.previewCanvas.nativeElement, '40');
            this.canvasLoading = false;
        };

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

}
