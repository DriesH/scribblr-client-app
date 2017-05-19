import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

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
    VALIDATION: 'validation',
    NOT_AUTHENTICATED: 'not_authenticated'
};

@Injectable()
export class ErrorHandlerService {

    UI_STATE$: any;

    constructor(
        private store: Store<any>,
        private _ns: NotificationsService,
        private router: Router) {
            this.initService(store);
        }

    private initService(store: Store<any>) {
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
                this.modelNotFound(error);
                break;

            case errorTypes.IMAGE_NOT_FOUND:
                this.imageNotFound(error);
                break;

            case errorTypes.VALIDATION:
                this.validation(error);
                break;
            case errorTypes.NOT_AUTHENTICATED:
                this.notAuth(error);
                break;
        }
    }

    // clear error from state.
    public clearError() {
        this.store.dispatch(new ApplicationUIActions.ClearErrors({}));
    }

    // Handler for model not found errors.
    private modelNotFound(error: Error) {
        // Contents for alert box.
        const _errorMsg = {
            title: 'Not found!',
            msg: 'We couldn\'t seem to find your kiddo... Maybe they\'re playing hide\'n\'seek again...',
            _msg: error.error_message
        };

        this._ns.error(_errorMsg.title, _errorMsg.msg);

        // Contents for ui state.
        const _error = {
            error: {
                type: errorTypes.MODEL_NOT_FOUND,
                msg: error.error_message
            }
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_error));

        this.router.navigate(['application']);
    }

    // Handler for image not found errors.
    private imageNotFound(error: Error) {
        // // Contents for alert box.
        // const _errorMsg = {
        //     title: 'Not found!',
        //     msg: 'We couldn\'t seem to find your kiddo... Maybe they\'re playing hide\'n\'seek again...',
        //     _msg: error.error_message
        // };

        // this._ns.error(_errorMsg.title, _errorMsg.msg);

        // Contents for ui state.
        const _error = {
            error: {
                type: errorTypes.IMAGE_NOT_FOUND,
                msg: error.error_message
            }
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_error));
    }

    // Handler for validation errors.
    private validation(error: Error) {
        const _error = {
            error: {
                type: errorTypes.VALIDATION,
                msg: error.error_message
            }
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_error));
    }

    private notAuth(error: Error) {
        // Contents for alert box.
        const _errorMsg = {
            title: 'Login error!',
            msg: 'Hmmm... That doesn\'t seem right...',
            _msg: error.error_message
        };

        this._ns.error(_errorMsg.title, _errorMsg.msg);

        // Contents for ui state.
        const _error = {
            error: {
                type: errorTypes.NOT_AUTHENTICATED,
                msg: error.error_message
            }
        };

        this.store.dispatch(new ApplicationUIActions.ShowErrorMessage(_error));
    }
}
