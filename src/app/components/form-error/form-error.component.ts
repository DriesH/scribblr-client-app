import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'scrblr-form-error',
    templateUrl: './form-error.component.html',
    styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

    @Input('model') model;
    @Input('modelName') modelName;

    private message;

    constructor() { }

    ngOnInit() {
        this.setMessage(this.model.errors);
    }

    private setMessage(errors) {
        console.log((errors.required !== null));

        if ((errors.required !== null)) {
            this.message = this.modelName + ' is required';
        }

    }

}
