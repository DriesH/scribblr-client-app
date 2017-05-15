import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'scrblr-form-error',
    templateUrl: './form-error.component.html',
    styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

    @Input('message') message: String;

    constructor() { }

    ngOnInit() {
    }

}
