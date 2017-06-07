import { Action } from '../action.interface';

import * as quoteActions from '../actions/quote.action';

export interface State {
    newQuote: {};
    updateQuote: {};
};

export const initialState: State = {
    newQuote: {},
    updateQuote: {}
};

export function QuoteReducer(state = initialState, action: Action) {
    switch (action.type) {
        case quoteActions.ActionTypes.NEW_QUOTE:
            return Object.assign({}, state, action.payload);

        case quoteActions.ActionTypes.UPDATE_QUOTE:
            return Object.assign({}, state, action.payload);

        case quoteActions.ActionTypes.CLEAR_QUOTES:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
