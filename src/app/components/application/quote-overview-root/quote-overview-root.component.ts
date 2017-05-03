import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { QuoteService } from '../../../services/application-services/quote.service';

import { APP_CONFIG } from '../../../_config/app.config';

declare var Aviary: any;

// TODO: Clean up.

@Component({
    selector: 'scrblr-quote-overview-root',
    templateUrl: './quote-overview-root.component.html',
    styleUrls: ['./quote-overview-root.component.scss']
})
export class QuoteOverviewRootComponent implements OnInit {

    @ViewChild('fileUpload') fileUpload: ElementRef;
    @ViewChild('editableImage') editableImage: ElementRef;

    quotes;
    imgData;
    csdkImageEditor;

    constructor(private _qs: QuoteService) { }

    ngOnInit() {
        this._qs.getAllQuotes()
        .subscribe(res => {
            this.quotes = res.quotes;
        }, error => {
            switch (error) {
                case 401: {
                    console.log('unauthorized');
                }
            }
        });

        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            theme: 'minimum',
            onSave: (imageID, newURL) => {
                this.imgData = newURL;
                this.csdkImageEditor.close();
            },
            onError: function (errorObj) {
                console.log(errorObj.code);
                console.log(errorObj.message);
                console.log(errorObj.args);
            }
        });

    }

    openDialog() {
        this.fileUpload.nativeElement.click();
    }

    fileChange(file) {
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

}
