import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as ApplicationUIActions from '../ngrx-state/actions/application-ui.action';

interface Error {
    success: Boolean;
    error_type: String;
    error_message: String;
    errors: Array<String>;
    old_input: any;
}

const errorTypes = {
    MODEL_NOT_FOUND: 'model_not_found',
    IMAGE_NOT_FOUND: 'image_not_found',
    VALIDATION: 'validation'
};

@Injectable()
export class ErrorHandlerService {

    constructor(private store: Store<any>) { }

    // Delegate errors to function handlers.
    handler(error: Error) {
        switch (error.error_type) {
            case errorTypes.MODEL_NOT_FOUND:
                this.modelNotFound(error.error_message);
                break;

            case errorTypes.IMAGE_NOT_FOUND:
                this.imageNotFound(error.error_message);
                break;

            case errorTypes.VALIDATION:
                this.validation(error.error_message);
                break;
        }
    }

    // Handler for model not found errors.
    modelNotFound(errorMsg) {

    }

    // Handler for image not found errors.
    imageNotFound(errorMsg) {

    }

    // Handler for validation errors.
    validation(errorMsg) {
        const _errorMsg = {
            msg: errorMsg,
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_errorMsg));
    }
}
