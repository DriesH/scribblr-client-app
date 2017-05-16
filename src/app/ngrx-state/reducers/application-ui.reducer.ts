import { Action } from '../action.interface';

import * as ApplicationActions from '../actions/application-ui.action';

export interface State {
    addingNewChild: Boolean;
    error: {
        type: String;
        msg: String;
    };
};

export const initialState: State = {
    addingNewChild: false,
    error: {
        type: null,
        msg: null
    }
};

export function ApplicationUIReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ApplicationActions.ActionTypes.ADD_NEW_CHILD_ACTIVE:
            return Object.assign({}, state, action.payload);

        case ApplicationActions.ActionTypes.NEW_ERROR_MESSAGE:
            return Object.assign({}, state, action.payload);

        case ApplicationActions.ActionTypes.CLEAR_ERROR_STATE:
            let resetError = {
                error: {
                    type: null,
                    msg: null
                }
            };

            return Object.assign({}, state, resetError);

        default:
            return state;
    }
};
