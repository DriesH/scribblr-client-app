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
            return {
                children: action.payload.slice(0)
            };

        case childActions.ActionTypes.ADD_CHILD:
            const newChild = action.payload;
            return Object.assign({}, state, state.children.push(newChild.child));

        default:
            return state;
    }
};
