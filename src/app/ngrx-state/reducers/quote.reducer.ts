import { Action } from '../action.interface';

import * as quoteActions from '../actions/quote.action';

export interface State {
    newQuote: {};
};

export const initialState: State = {
    newQuote: {}
};

export function QuoteReducer(state = initialState, action: Action) {
    switch (action.type) {
        case quoteActions.ActionTypes.NEW_QUOTE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
