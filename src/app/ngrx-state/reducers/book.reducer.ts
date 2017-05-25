import { Action } from '../action.interface';

import * as bookActions from '../actions/book.action';

export interface State {
    book: Array<any>;
    posts: Array<Object>;
};

export const initialState: State = {
    book: [],
    posts: []
};

export function BookReducer(state: any = initialState, action: Action) {
    switch (action.type) {
        case bookActions.ActionTypes.BOOK_DATA_RECEIVED:

            return Object.assign({}, state, {
                book: action.payload
            });

        case bookActions.ActionTypes.POSTS_DATA_RECEIVED:
            return Object.assign({}, state, {
                posts: action.payload
            });

        case bookActions.ActionTypes.UPDATE_BOOK_PAGE:
            let book = state.book;

            book[action.payload.pageIndex][action.payload.pageSide] = action.payload.newPageData;

            return Object.assign({}, state, {
                book: book
            });

        default:
            return state;
    }
};
