import { Action } from '../action.interface';

import * as childActions from '../actions/child.action';

export interface State {
    children: Array<any>;
};

export const initialState: State = {
    children: []
};

export function ChildReducer(state = initialState, action: Action) {
    switch (action.type) {
        case childActions.ActionTypes.SUCCESS_DOWNLOAD_CHILDREN:
            state.children = action.payload.slice(0);
            return state;

        default:
            return state;
    }
};
