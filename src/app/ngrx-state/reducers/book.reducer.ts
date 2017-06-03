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
    let index = 0;

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
            if (action.payload.isMemory === 1) {
                return {
                    ...state,
                    book: [
                        ...state.book.slice(0, action.payload.pageIndex),
                        [action.payload.newPageData, {}],
                        ...state.book.slice(action.payload.pageIndex + 1),
                    ]
                };
            } else {
                if (state.book[action.payload.pageIndex][0].is_memory === 1) {
                    if (action.payload.pageSide === 1) {
                        return {
                            ...state,
                            book: [
                                ...state.book.slice(0, action.payload.pageIndex),
                                [{}, action.payload.newPageData],
                                ...state.book.slice(action.payload.pageIndex + 1),
                            ]
                        };
                    }
                }
                if (action.payload.pageSide === 0) {
                    return {
                        ...state,
                        book: [
                            ...state.book.slice(0, action.payload.pageIndex),
                            [action.payload.newPageData, state.book[action.payload.pageIndex][1]],
                            ...state.book.slice(action.payload.pageIndex + 1),
                        ]
                    };
                } else if (action.payload.pageSide === 1) {
                    return {
                        ...state,
                        book: [
                            ...state.book.slice(0, action.payload.pageIndex),
                            [state.book[action.payload.pageIndex][0], action.payload.newPageData],
                            ...state.book.slice(action.payload.pageIndex + 1),
                        ]
                    };
                }
            }
            break;

        case bookActions.ActionTypes.REMOVE_FROM_BOOK:
            if (action.payload.pageSide === 0) {
                return {
                    ...state,
                    book: [
                        ...state.book.slice(0, action.payload.pageIndex),
                        [{}, state.book[action.payload.pageIndex][1]],
                        ...state.book.slice(action.payload.pageIndex + 1),
                    ]
                };
            } else if (action.payload.pageSide === 1) {
                return {
                    ...state,
                    book: [
                        ...state.book.slice(0, action.payload.pageIndex),
                        [state.book[action.payload.pageIndex][0], {}],
                        ...state.book.slice(action.payload.pageIndex + 1),
                    ]
                };
            }
            break;

        case bookActions.ActionTypes.REMOVE_FROM_POST_LIST:
            index = 0;

            state.posts.forEach((item, key) => {
                if (item.short_id === action.payload.shortId) {
                    index = key;
                }
            });

            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, index),
                    { ...state.posts[index], is_used_in_book: 1 },
                    ...state.posts.slice(index + 1)
                ]
            };

        case bookActions.ActionTypes.ADD_TO_POST_LIST:
            index = 0;

            if (action.payload.shortId) {
                state.posts.forEach((item, key) => {
                    if (item.short_id === action.payload.shortId) {
                        index = key;
                    }
                });

                return {
                    ...state,
                    posts: [
                        ...state.posts.slice(0, index),
                        { ...state.posts[index], is_used_in_book: 0 },
                        ...state.posts.slice(index + 1)
                    ]
                };
            } else {
                return state;
            }

        default:
            return state;
    }
};
