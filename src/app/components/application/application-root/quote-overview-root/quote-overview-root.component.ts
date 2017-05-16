import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { QuoteService } from '../../../../services/application-services/quote.service';

import { APP_CONFIG } from '../../../../_config/app.config';

declare var Aviary: any;

@Component({
    selector: 'scrblr-quote-overview-root',
    templateUrl: './quote-overview-root.component.html',
    styleUrls: ['./quote-overview-root.component.scss']
})
export class QuoteOverviewRootComponent implements OnInit {

    @ViewChild('fileUpload')    fileUpload: ElementRef;
    @ViewChild('editableImage') editableImage: ElementRef;
    @ViewChild('dropzoneInput') dropzoneInput: ElementRef;

    quotes; // todo model quote
    imgData: String;
    csdkImageEditor;
    myDropzone;

    constructor(
        private _qs: QuoteService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this._qs.getAllQuotes()
            .subscribe(res => {
                this.quotes = res.quotes;
            });

        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: APP_CONFIG.aviarySettings,
            onSave: this.saveToAviary.bind(this),
            onError: this.errorSavingToAviary,
            onClose: this.onAviaryClose.bind(this)
        });
    }

    fileOverBase(e) {
        console.log(event);
    }

    saveToAviary(imageID, newURL) {
        let data = {
            link: newURL,
            short_id: ''
        };

        this.imgData = newURL;

        this._qs.newQuote(data.short_id, data)
            .subscribe(res => {
                console.log(res);
            });

        this.resetFileInput();
        this.csdkImageEditor.close();
    }

    errorSavingToAviary(errorObj) {
        this.resetFileInput();
        console.log(errorObj.code);
        console.log(errorObj.message);
        console.log(errorObj.args);
    }

    openDialog() {
        this.fileUpload.nativeElement.click();
    }

    fileChange(file) {
        console.log(this.fileUpload.nativeElement.files);
        this.readURL(this.fileUpload.nativeElement);
    }

    readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload =  (e: any) => {
                this.imgData = e.target.result;

                let currentImage = this.editableImage.nativeElement;
                this.csdkImageEditor.launch({
                    image: currentImage.id,
                    url: e.target.result
                });
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    onAviaryClose(isDirty) {
        this.resetFileInput();
        console.log(isDirty);
    }

    resetFileInput() {
        this.fileUpload.nativeElement.value = "";
    }
}
