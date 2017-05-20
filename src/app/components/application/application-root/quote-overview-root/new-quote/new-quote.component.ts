import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuoteService } from '../../../../../services/application-services/quote.service';

import { dataURItoBlob } from '../../../../../classes/base64toblob';

import { APP_CONFIG } from '../../../../../_config/app.config';

import { DropzoneService } from '../../../../../services/dropzone.service';

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

    quoteModel = {
        story: null,
        quote: null,
        font: 'Calibri',
        selectedPreset: '/assets/preset-imgs/horses.jpg'
    };

    fonts: Array<String>;

    defaultPreset = '/assets/preset-imgs/horses.jpg';

    presetPickerActive = true;

    buttonMessage = {
        your_own: 'Upload your own image!',
        preset: 'Select a preset image!',
    };

    quoteData: FormData = new FormData();

    aviaryLink = null;
    presetId = '1';
    childShortId: String;

    constructor(
        private _dz: DropzoneService,
        private _qs: QuoteService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>) { }

    ngOnInit() {
        this._qs.getFonts().subscribe(res => this.fonts = res.fonts);

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
        c.width = img.width;
        c.height = img.height;

        // Redraw the image.
        ctx.drawImage(img, 0, 0);

        // Redraw the overlay.
        ctx.fillStyle = `rgba(0, 0, 0, 0.${overlayOpacity})`;
        ctx.fillRect(0, 0, c.width, c.height);

        fontSize = c.width / 20;

        // Set the font.
        ctx.font = `${ fontSize }px ` + this.quoteModel.font;

        // Align the text.
        ctx.textAlign = 'center';

        // Set the text color.
        ctx.fillStyle = 'white';

        const text = this.getLines(ctx, this.quoteModel.quote, c.width - 150);

        // Draw the text in the middle.
        text.forEach((item, key) => {
            let translationY = (text.length - 1) * 25;

            ctx.fillText(item, c.width / 2, ((c.height / 2) + (50 * key)) - translationY);
        });
    }

    /**
     * Change the preset image.
     * @param e: Event
     */
    changeImage(e) {
        e.preventDefault();
        console.log('changeImage');
        this.quoteModel.selectedPreset = e.srcElement.currentSrc;
    }

    /**
     * Clear the canvas
     */
    clearCanvas(c: HTMLCanvasElement) {
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, c.width, c.height);
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
            this._dz.init(this.dropzone.nativeElement, this.userImg.nativeElement);
        } else {
            this.quoteModel.selectedPreset = this.defaultPreset;
            this.initCanvas(this.presetImg.nativeElement, this.previewCanvas.nativeElement, '40');
        }


    }

    /**
     * Line wrapping for canvas.
     * @param ctx: CanvasContext
     * @param text: String
     * @param maxWidth: Number
     */
    getLines(ctx, text, maxWidth) {
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

        let img = new Image();

        img.src = newURL;
        img.setAttribute('crossOrigin', 'anonymous');

        this.aviaryLink = newURL;

        img.onload = () => {
            this.initCanvas(img, this.previewCanvas.nativeElement, '40');
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
        this.quoteData.append('quote',        this.quoteModel.quote);
        this.quoteData.append('story',        this.quoteModel.story);
        this.quoteData.append('font_type',    this.quoteModel.font);

        if (this.presetPickerActive) {
            this.quoteData.append('preset', this.presetId);
        } else {
            this.quoteData.append('img_original', this.aviaryLink);
        }

        c.toBlob(blob => {
            this.quoteData.append('img_baked', blob, 'baked_img.jpg');
            this._qs.newQuote(this.childShortId , this.quoteData)
                .subscribe(res => this.dispatchNewQuote(res.quote));
        }, 'image/jpeg', 0.65);

    }

    dispatchNewQuote(newQuote) {
        this.store.dispatch(new quoteActions.NewQuote({ newQuote: newQuote }));

        this.router.navigate(['application', 'scribbles', this.childShortId]);
    }
}
