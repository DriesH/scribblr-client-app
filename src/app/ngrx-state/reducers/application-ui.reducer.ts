import { Action } from '../action.interface';

import * as ApplicationActions from '../actions/application-ui.action';

export interface State {
    addingNewChild: Boolean;
    errorMessage: {};
};

export const initialState: State = {
    addingNewChild: false,
    errorMessage: {}
};

export function ApplicationUIReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ApplicationActions.ActionTypes.ADD_NEW_CHILD_ACTIVE:
            return Object.assign({}, state, action.payload);

        case ApplicationActions.ActionTypes.NEW_ERROR_MESSAGE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
