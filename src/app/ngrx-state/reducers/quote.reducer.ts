import { Action } from '../action.interface';

import * as QuoteActions from '../actions/quote.action';

export interface State {
    posts: Array<any>;
};

export const initialState: State = {
    posts: []
};

export function QuoteReducer(state = initialState, action: Action) {
    let index = -1;

    switch (action.type) {
        case QuoteActions.ActionTypes.POSTS_LOADED:
            return Object.assign({}, state, action.payload);

        case QuoteActions.ActionTypes.NEW_QUOTE:
            return {
                ...state,
                posts: [
                    action.payload.newPost,
                    ...state.posts
                ]
            };

        case QuoteActions.ActionTypes.UPDATE_QUOTE:
            index = -1;

            state.posts.forEach((item, key) => {
                if (item.short_id === action.payload.updatedPost.short_id) {
                    index = key;
                }
            });

            if (index !== -1) {
                return {
                    ...state,
                    posts: [
                        ...state.posts.slice(0, index),
                        action.payload.updatedPost,
                        ...state.posts.slice(index + 1)
                    ]
                };
            } else {
                return state;
            }

        case QuoteActions.ActionTypes.REMOVE_QUOTE:
            index = -1;

            state.posts.forEach((item, key) => {
                if (item.short_id === action.payload.updatedQuote.short_id) {
                    index = key;
                }
            });

            if (index !== -1) {
                return {
                    ...state,
                    posts: [
                        ...state.posts.slice(0, index),
                        ...state.posts.slice(index + 1)
                    ]
                };
            } else {
                return state;
            }


        case QuoteActions.ActionTypes.CLEAR_QUOTES:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
