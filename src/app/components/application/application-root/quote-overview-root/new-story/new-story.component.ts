import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { APP_CONFIG } from '../../../../../_config/app.config';

import { DropzoneService } from '../../../../../services/dropzone.service';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import * as quoteActions from '../../../../../ngrx-state/actions/quote.action';


declare var Aviary: any;

@Component({
    selector: 'scrblr-new-story',
    templateUrl: './new-story.component.html',
    styleUrls: ['./new-story.component.scss'],
    providers: [ DropzoneService ]
})
export class NewStoryComponent implements OnInit {

    csdkImageEditor;

    canvasLoading = false;

    aviaryLink: string = null;

    childShortId: String;

    storyModel = {
        story: null,
        img_baked: null
    };

    storyData: FormData = new FormData();

    imageLoaded = false;

    @ViewChild('presetImg') presetImg: ElementRef;
    @ViewChild('userImg') userImg: ElementRef;
    @ViewChild('previewCanvas') previewCanvas: ElementRef;
    @ViewChild('dropzone') dropzone: ElementRef;

    constructor(
        private _dz: DropzoneService,
        private _qs: QuoteService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: APP_CONFIG.aviarySettings,
            onSave: this.saveToAviary.bind(this),
            onError: this.errorSavingToAviary,
            onClose: this.onAviaryClose.bind(this)
        });

        this._dz.init(this.dropzone.nativeElement, this.userImg.nativeElement);

        this.route.parent.params.subscribe(params => {
            this.childShortId = params.short_id_child;
        });
    }

    addNewStory(childShortId, storyModel) {
        this.storyData.set('story', storyModel.story);
        this.storyData.set('img_baked', storyModel.img_baked);

        this._qs.newStory(childShortId, this.storyData).subscribe(res => {
            this.dispatchNewQuote(res.story);
        });
    }

    dispatchNewQuote(newQuote) {
        this.store.dispatch(new quoteActions.NewQuote({ newQuote: newQuote }));
        this.router.navigate(['application', 'overview', this.childShortId]);
    }

    /**
     * Start the photo-editor
     * @param e: Event
     */
    startAviary(e) {
        console.log(e);

        this.imageLoaded = true;

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
        this.userImg.nativeElement.src = newURL;
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

}
