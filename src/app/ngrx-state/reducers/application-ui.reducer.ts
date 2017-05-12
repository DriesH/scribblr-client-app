import { Action } from '../action.interface';

import * as ApplicationActions from '../actions/application-ui.action';

export interface State {
    addingNewChild: Boolean;
};

export const initialState: State = {
    addingNewChild: false
};

export function ApplicationUIReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ApplicationActions.ActionTypes.ADD_NEW_CHILD_ACTIVE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
