import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { APP_CONFIG } from '../../../../../_config/app.config';

import { DropzoneService } from '../../../../../services/dropzone.service';

import { PexelsapiService } from '../../../../../services/application-services/pexelsapi.service';

import { Store } from '@ngrx/store';

import * as quoteActions from '../../../../../ngrx-state/actions/quote.action';

declare var Aviary: any;

@Component({
    selector: 'scrblr-new-quote',
    templateUrl: './new-quote.component.html',
    styleUrls: ['./new-quote.component.scss'],
    providers: [ DropzoneService ]
})
export class NewQuoteComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('presetImg') presetImg: ElementRef;
    @ViewChild('userImg') userImg: ElementRef;
    @ViewChild('previewCanvas') previewCanvas: ElementRef;
    @ViewChild('dropzone') dropzone: ElementRef;

    csdkImageEditor;
    searchIsActive = false;

    defaultPreset = 'https://images.pexels.com/photos/2324/skyline-buildings-new-york-skyscrapers.jpg?w=940&h=650&auto=compress&cs=tinysrgb';
    presetId;
    quoteModel = {
        quote: null,
        font: 'Boogaloo',
        selectedPreset: this.defaultPreset
    };

    fonts: Array<String>;
    pexelsImgs;

    presetPickerActive = true;

    quoteData: FormData = new FormData();

    aviaryLink = null;
    childShortId: String;

    canvasLoading = false;

    pexelsLoading = false;
    oldSearchQuery = '';

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
        this._qs.getFonts().subscribe(res => this.fonts = res.fonts);

        this.canvasLoading = true;

        this.pexelsLoading = true;

        this._pas.getMostPopular().subscribe(res => {
            this.pexelsLoading = false;
            this.pexelsImgs = res.photos;
        });

        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: APP_CONFIG.aviarySettings,
            onSave: this.saveToAviary.bind(this),
            onError: this.errorSavingToAviary,
            onClose: this.onAviaryClose.bind(this)
        });

        this.route.parent.params.subscribe(params => {
            this.childShortId = params.short_id_child;
        });
    }

    ngAfterViewInit() {
        this.initCanvas(this.presetImg.nativeElement, this.previewCanvas.nativeElement, '40');
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.addEventListener('keyup', this.closeOverlay.bind(this));
    }

    removeEventListeners() {
        document.removeEventListener('keyup', this.closeOverlay.bind(this));
    }

    closeOverlay(event) {
        event.preventDefault();
        if ( event.key === 'Escape') {
            this.location.back();
        }
    }

    ngOnDestroy() {
        if (!this.presetPickerActive) {
            this._dz.destroy(this.dropzone.nativeElement);
        }


    }

    updateCanvasOnKeyup() {
        if (this.presetPickerActive) {
            this.updateCanvas(this.presetImg.nativeElement, this.previewCanvas.nativeElement, '40');
        } else {
            this.updateCanvas(this.userImg.nativeElement, this.previewCanvas.nativeElement, '40');
        }
    }

    updateCanvasOnChange() {
        if (this.presetPickerActive) {
            this.updateCanvas(this.presetImg.nativeElement, this.previewCanvas.nativeElement, '40');
        } else {
            this.updateCanvas(this.userImg.nativeElement, this.previewCanvas.nativeElement, '40');
        }
    }

    /**
    * Initialize the canvas.
    * @param img : HTMLImageElement
    * @param c : HTMLCanvasElement
    * @param overlayOpacity : String *format: ('00'->'99')
    */
    initCanvas(img: HTMLImageElement, c: HTMLCanvasElement, overlayOpacity: String) {
        // Get canvas context
        const ctx = c.getContext('2d');

        // Set the canvas width and height.
        c.width = img.width;
        c.height = img.height;

        // Draw the image to the canvas.
        ctx.drawImage(img, 0, 0);

        // Draw a black overlay with an opacity.
        ctx.fillStyle = `rgba(0, 0, 0, 0.${ overlayOpacity })`;
        ctx.fillRect(0, 0, c.width, c.height);

        if ( this.quoteModel.quote !== null ) {
            this.updateCanvas(img, c, overlayOpacity);
        }

        this.canvasLoading = false;
    }

    /**
    * Update the canvas.
    * @param img : HTMLImageElement
    * @param c : HTMLCanvasElement
    * @param overlayOpacity : String
    */
    updateCanvas(img: HTMLImageElement, c: HTMLCanvasElement, overlayOpacity: String) {
        const ctx = c.getContext('2d');
        let fontSize;

        // Set the canvas width and height.
        if (img.width === 0 && img.height === 0) {
            c.width = 1680;
            c.height = 1050;
        } else {
            c.width = img.width;
            c.height = img.height;
        }

        // Redraw the image.
        ctx.drawImage(img, 0, 0);

        // Redraw the overlay.
        ctx.fillStyle = `rgba(0, 0, 0, 0.${overlayOpacity})`;
        ctx.fillRect(0, 0, c.width, c.height);

        fontSize = c.height / 8;

        // Set the font.
        ctx.font = `${ fontSize }px ` + this.quoteModel.font;

        // Align the text.
        ctx.textAlign = 'center';

        // Set the text color.
        ctx.fillStyle = 'white';

        // Get the new lines from the text.
        const text = this.getLines(ctx, this.quoteModel.quote, c.width - 150);

        if (text) {
            // Draw the text in the middle.
            text.forEach((item, key) => {
                let translationY = (text.length - 1) * (fontSize / 2);

                ctx.textBaseline = 'middle';
                ctx.fillText(item, c.width / 2, ((c.height / 2) + (fontSize * key)) - translationY);
            });
        }
    }

    /**
    * Change the preset image.
    * @param e: Event
    */
    changeImage(e, original_url) {
        e.preventDefault();
        console.log('changeImage');
        this.quoteModel.selectedPreset = original_url;
    }

    /**
    * Clear the canvas
    */
    clearCanvas(c: HTMLCanvasElement) {
        const ctx = c.getContext('2d');
        let fontSize;

        c.width = 1680;
        c.height = 1050;

        ctx.fillStyle = 'rgb(45,51,56)';
        ctx.fillRect(0, 0, c.width, c.height);

        fontSize = c.height / 15;

        // Set the font.
        ctx.font = `${fontSize}px Calibri`;

        // Align the text.
        ctx.textAlign = 'center';

        // Set the text color.
        ctx.fillStyle = 'white';

        ctx.fillText('Select an image on your computer', c.width / 2, (c.height / 2) - (fontSize / 2));
        ctx.fillText('and drop it on the page!', c.width / 2, (c.height / 2) + (fontSize / 2));
    }

    /**
    * Changes the modus for the user.
    * Preset images selector or upload your own.
    */
    toggleImageMode() {


        this.presetPickerActive = !this.presetPickerActive;

        this.quoteModel.selectedPreset = null;
        this.clearCanvas(this.previewCanvas.nativeElement);

        if (!this.presetPickerActive) {
            if (this.aviaryLink) {
                this.saveToAviary('', this.aviaryLink);
            }

            this._dz.init(this.dropzone.nativeElement, this.userImg.nativeElement);
        } else {
            this.quoteModel.selectedPreset = this.defaultPreset;
        }


    }

    /**
    * Line wrapping for canvas.
    * @param ctx: CanvasContext
    * @param text: String
    * @param maxWidth: Number
    */
    getLines(ctx, text, maxWidth) {
        if (!text) {
            return;
        }

        let words = text.split(' ');
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            let width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
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
            this.initCanvas(img, this.previewCanvas.nativeElement, '40');
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

    addNewQuote(c: HTMLCanvasElement) {
        this.quoteData.append('quote', this.quoteModel.quote);
        this.quoteData.append('font_type', this.quoteModel.font);

        if (this.presetPickerActive) {
            this.quoteData.append('img_original', this.quoteModel.selectedPreset);
        } else {
            this.quoteData.append('img_original', this.aviaryLink);
        }

        c.toBlob(blob => {
            this.quoteData.append('img_baked', blob, 'baked_img.jpg');
            this._qs.newQuote(this.childShortId , this.quoteData).subscribe(res => this.dispatchNewQuote(res.quote));
        }, 'image/jpeg', 0.65);

    }

    dispatchNewQuote(newQuote) {
        this.store.dispatch(new quoteActions.NewQuote({ newPost: newQuote }));

        this.router.navigate(['application', 'overview', this.childShortId]);
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
}
