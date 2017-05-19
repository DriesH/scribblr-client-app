import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { dataURItoBlob } from '../../../../../classes/base64toblob';

import { APP_CONFIG } from '../../../../../_config/app.config';

import { DropzoneService } from '../../../../../services/dropzone.service';

declare var Aviary: any;

@Component({
  selector: 'scrblr-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss'],
  providers: [ DropzoneService ]
})
export class NewQuoteComponent implements OnInit, OnDestroy, AfterViewInit {

    csdkImageEditor;

    c; // canvas
    ctx; // canvas context

    quoteModel = {
        story: null,
        quote: null,
        font: 'Calibri',
        selectedPreset: '/assets/preset-imgs/horses.jpg'
    };

    presetPickerActive = true;
    buttonMessage = {
        your_own: 'Upload your own image!',
        preset: 'Select a preset image!',
    };

    @ViewChild('presetImg') presetImg: ElementRef;
    @ViewChild('userImg') userImg: ElementRef;
    @ViewChild('previewCanvas') previewCanvas: ElementRef;
    @ViewChild('dropzone') dropzone: ElementRef;

    constructor(private _dz: DropzoneService) { }

    ngOnInit() {
        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: APP_CONFIG.aviarySettings,
            onSave: this.saveToAviary.bind(this),
            onError: this.errorSavingToAviary,
            onClose: this.onAviaryClose.bind(this)
        });
    }

    ngAfterViewInit() {
        this.initCanvas(this.presetImg.nativeElement);
    }

    ngOnDestroy() {
        if (!this.presetPickerActive) {
            this._dz.destroy(this.dropzone.nativeElement);
        }
    }

    initCanvas(img) {
        console.log(img);
        this.c = this.previewCanvas.nativeElement;
        this.ctx = this.c.getContext('2d');
        this.c.width = img.width;
        this.c.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);


        if (this.quoteModel.quote !== null) {
            this.updateCanvas();
        }

        console.log('canvas has been initialized');
    }

    updateCanvas() {
        console.log('updateCanvas');

        if (this.presetImg) {
            this.ctx.drawImage(this.presetImg.nativeElement, 0, 0);
        } else {
            this.ctx.drawImage(this.userImg.nativeElement, 0, 0);
        }



        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);
        this.ctx.font = '50px ' + this.quoteModel.font;
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.quoteModel.quote, this.c.width / 2, this.c.height / 2);
    }


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




    changeImage(e) {
        e.preventDefault();
        console.log('changeImage');
        this.quoteModel.selectedPreset = e.srcElement.currentSrc;
    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);
    }

    toggleImageMode() {
        this.presetPickerActive = !this.presetPickerActive;
        this.quoteModel.selectedPreset = null;
        this.clearCanvas();

        if (!this.presetPickerActive) {
            this._dz.init(this.dropzone.nativeElement, this.userImg.nativeElement);
        }

    }

    startAviary(e) {
        console.log(e);

        this.csdkImageEditor.launch({
            image: this.userImg.nativeElement.id
        });
        console.log('startAviary');
    }

    saveToAviary(imageID, newURL) {
        console.log('newURL: ', newURL);
        console.log('imageID: ', imageID);

        // this.userImg.nativeElement.src = newURL;

        let img = new Image();

        img.src = newURL;
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = () => {
            this.initCanvas(img);
        };

        this.csdkImageEditor.close();
    }

    errorSavingToAviary(errorObj) {
        console.log('erroooor');
    }

    onAviaryClose(isDirty) {
    }
}
