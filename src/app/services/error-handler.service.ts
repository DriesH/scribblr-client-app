import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as ApplicationUIActions from '../ngrx-state/actions/application-ui.action';

import { NotificationsService } from 'angular2-notifications';

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

    UI_STATE$: any;

    constructor(
        private store: Store<any>,
        private _ns: NotificationsService) { }

    initService(store: Store<any>) {
        store.select('APPLICATION_UI').subscribe(APPLICATION_UI => {
            this.UI_STATE$ = APPLICATION_UI;

            if (this.UI_STATE$) {

            }
        });
    }

    // Delegate errors to function handlers.
    public handler(error: Error) {
        switch (error.error_type) {
            case errorTypes.MODEL_NOT_FOUND:
                this.modelNotFound(error.error_message);
                break;

            case errorTypes.IMAGE_NOT_FOUND:
                this.imageNotFound(error.error_message);
                break;

            case errorTypes.VALIDATION:
                this.validation(error);
                break;
        }
    }

    // clear error from state.
    public clearError() {
        this.store.dispatch(new ApplicationUIActions.ClearErrors({}));
    }

    // Handler for model not found errors.
    private modelNotFound(errorMsg) {
        // Contents for alert box.
        const _errorMsg = {
            title: 'Not found!',
            msg: 'We couldn\'t seem to find your kiddo... Maybe they\'re playing hide\'n\'seek again...',
            _msg: errorMsg
        };

        this._ns.error(_errorMsg.title, _errorMsg.msg);

        // Contents for ui state.
        const _error = {
            error: {
                type: 'model_not_found',
                msg: errorMsg
            }
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_error));
    }

    // Handler for image not found errors.
    private imageNotFound(errorMsg) {

    }

    // Handler for validation errors.
    private validation(error: Error) {
        const _error = {
            error: {
                type: 'validation',
                msg: error.error_message
            }
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_error));
    }
}
