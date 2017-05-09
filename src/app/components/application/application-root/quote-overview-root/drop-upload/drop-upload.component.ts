import { Component } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

import { API_ROUTES } from '../../../../../_api-routes/api.routes';

@Component({
  selector: 'scrblr-drop-upload',
  templateUrl: './drop-upload.component.html',
  styleUrls: ['./drop-upload.component.scss']
})
export class DropUploadComponent {
    public uploader: FileUploader = new FileUploader({
        url: API_ROUTES.application.quotes.newQuote('test'),
        autoUpload: true
    });
    public hasBaseDropZoneOver = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
        console.log(this.uploader);
    }
}
