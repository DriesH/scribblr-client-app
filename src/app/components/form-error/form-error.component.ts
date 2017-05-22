import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'scrblr-form-error',
    templateUrl: './form-error.component.html',
    styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

    @Input('model') model;
    @Input('modelName') modelName;

    private message = {
        email: null,
        required: null,
    };

    constructor() { }

    ngOnInit() {
        this.setMessage(this.model.errors);
    }

    private setMessage(errors) {

        if ((errors.required !== null) || (errors.required !== undefined)) {
            this.message.required = this.modelName + ' is required.';
        }

        if ((errors.email !== undefined)) {
            this.message.email = 'That\'s not a valid email address.';

            this.message.required = null;
        }
    }

}
