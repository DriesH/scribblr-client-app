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
            let isMemory = action.payload.isMemory;

            console.log(isMemory);

            if (isMemory === 1) {
                book[action.payload.pageIndex][0] = action.payload.newPageData;
                book[action.payload.pageIndex][1] = {};
                console.log('is memory');
            } else {
                if (book[action.payload.pageIndex][0].is_memory === 1) {
                    book[action.payload.pageIndex][0] = {};
                }

                book[action.payload.pageIndex][action.payload.pageSide] = action.payload.newPageData;
                console.log('is not memory');
            }

            return Object.assign({}, state, {
                book: book
            });

        case bookActions.ActionTypes.REMOVE_FROM_BOOK:
            return Object.assign({}, state, {

            });

        case bookActions.ActionTypes.REMOVE_FROM_POST_LIST:
            return Object.assign({}, state, {

            });

        case bookActions.ActionTypes.ADD_TO_POST_LIST:
            return Object.assign({}, state, {

            });

        default:
            return state;
    }
};
