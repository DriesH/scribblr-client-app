import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as ApplicationUIActions from '../ngrx-state/actions/application-ui.action';

import { NotificationsService } from 'angular2-notifications';

interface Error {
    success: Boolean;
    error_type: String;
    error_message: string;
    errors: any;
    old_input: any;
}

const errorTypes = {
    MODEL_NOT_FOUND: 'model_not_found',
    IMAGE_NOT_FOUND: 'image_not_found',
    VALIDATION: 'validation',
    NOT_AUTHENTICATED: 'not_authenticated',
    SERVER_ERROR: 'internal_server',
    NO_POSTS: 'no_posts'
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
        // console.log(error);
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

            case errorTypes.SERVER_ERROR:
                this.serverError(error);
                break;
            case errorTypes.NO_POSTS:
                this.noPosts(error);
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
            msg: 'We couldn\'t seem to find what you were looking for...',
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

        this.router.navigate(['application', 'home']);
    }

    // Handler for image not found errors.
    private imageNotFound(error: Error) {
        // Contents for alert box.
        const _errorMsg = {
            title: 'Image not found!',
            msg: 'The image you are looking for can not be found...',
            _msg: error.error_message
        };

        this._ns.error(_errorMsg.title, _errorMsg.msg);

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
        const _errorMsg = {
            title: 'Wooooops!',
            msg: error.error_message,
            _msg: ''
        };

        if (error.errors.email) {
            _errorMsg.msg = error.errors.email[0];
            _errorMsg._msg = error.errors.email[0];
        }

        if (error.errors.password) {
            _errorMsg.msg = error.errors.password[0];
            _errorMsg._msg = error.errors.password[0];
        }

        if (error.errors.fullname) {
            _errorMsg.msg = error.errors.fullname[0];
            _errorMsg._msg = error.errors.fullname[0];
        }

        this._ns.error(_errorMsg.title, _errorMsg.msg);

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
            msg: 'Hmmm... You sure those credentials are correct? It seems we can\'t find you...',
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

    private serverError(error: Error) {
        // Contents for alert box.
        const _errorMsg = {
            title: 'Server error!',
            msg: 'The server has exploded... Give us some time! We\'re fixing it!',
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

    private noPosts(error: Error) {
        // console.log(error);
        // Contents for alert box.
        const _errorMsg = {
            title: 'No posts!',
            msg: error.error_message,
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

        this.router.navigate(['application', 'books']);

    }
}
