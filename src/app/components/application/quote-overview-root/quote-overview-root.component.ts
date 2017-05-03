import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { QuoteService } from '../../../services/application-services/quote.service';

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
            let that = this;
            reader.onload = function (e:any) {
                that.imgData = e.target.result;

                // console.log(e.target.result);
                // that.editableImage.nativeElement.setElementAttribute('src', e.target.result).hide();
                // let currentImage = $('#editable-image')[0];
                // that.csdkImageEditor.launch({
                //     image: currentImage.id,
                //     url: e.target.result
                // });
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

}
