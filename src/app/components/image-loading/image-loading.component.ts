import { Component, OnInit, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'scrblr-image-loading',
  templateUrl: './image-loading.component.html',
  styleUrls: ['./image-loading.component.scss']
})
export class ImageLoadingComponent implements OnInit, OnChanges {

    @Input() src: String;

    loaded = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: any) {
      this.loaded = false;
    }

    doneLoading() {
      this.loaded = true;
    }
}
