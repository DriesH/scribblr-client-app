import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { QuoteService } from '../../../../services/application-services/quote.service';
import { ChildService } from '../../../../services/application-services/child.service';

import { APP_CONFIG } from '../../../../_config/app.config';
import { Http } from '@angular/http';

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
    children;

    constructor(private _qs: QuoteService, private _cs: ChildService, private route: ActivatedRoute, private http: Http) { }

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

        this._cs.getAllChildren()
        .subscribe(res => {
            this.children = res.children;
            console.log('received children');
        }, error => {
            switch (error) {
                case 401: {
                    console.log('unauthorized');
                }
            }
        });


        this.csdkImageEditor = new Aviary.Feather({
            apiKey: APP_CONFIG.apiKeyAviary,
            tools: [
                'text',
                'orientation',
                'crop',
                'frames',
                'enhance',
                'effects',
                'focus',
                'vignette',
                'redeye',
                'sharpness',
                'colorsplash',
            ],
            onSave: (imageID, newURL) => {
                this.imgData = newURL;
                this.csdkImageEditor.close();
                console.log(newURL);
                this._qs.newQuote(
                    'zpBffGlq',
                    {
                        link: newURL
                    }
                )
                .subscribe(res => {
                    console.log(res);
                }, error => {
                    switch (error) {
                        case 401: {
                            console.log('unauthorized');
                        }
                    }
                });
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
