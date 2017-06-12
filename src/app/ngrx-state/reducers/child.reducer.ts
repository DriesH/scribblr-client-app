import { Action } from '../action.interface';

import * as childActions from '../actions/child.action';

export interface State {
    children: Array<any>;
    receivedCall: boolean;
};

export const initialState: State = {
    children: [],
    receivedCall: false
};

export function ChildReducer(state = initialState, action: Action) {
    let index = 0;
    let updatedChild;

    switch (action.type) {
        case childActions.ActionTypes.SUCCESS_DOWNLOAD_CHILDREN:
            return {
                children: action.payload.slice(0),
                receivedCall: true
            };

        case childActions.ActionTypes.ADD_CHILD:
            const newChild = action.payload;
            const currentChildren = state;
            currentChildren.children.push(newChild);

            return Object.assign({}, state, currentChildren);

        case childActions.ActionTypes.EDIT_CHILD:
            index = 0;
            updatedChild = {};

            updatedChild = action.payload.updatedChild;

            state.children.forEach((child, key) => {
                if (child.short_id === action.payload.updatedChild.short_id) {
                    index = key;
                }
            });

            if (state.children[index].avatar_url_id === action.payload.updatedChild.avatar_url_id) {
                return {
                    receivedCall: true,
                    children: [
                        ...state.children.slice(0, index),
                        {
                            ...state.children[index],
                            full_name: updatedChild.full_name,
                            gender: updatedChild.gender,
                            date_of_birth: updatedChild.date_of_birth
                        },
                        ...state.children.slice(index + 1)
                    ]
                };
            } else {
                return {
                    receivedCall: true,
                    children: [
                        ...state.children.slice(0, index),
                        {
                            ...state.children[index],
                            full_name: updatedChild.full_name,
                            gender: updatedChild.gender,
                            date_of_birth: updatedChild.date_of_birth,
                            avatar_url_id: updatedChild.avatar_url_id
                        },
                        ...state.children.slice(index + 1)
                    ]
                };
            }

        case childActions.ActionTypes.DELETE_CHILD:
            state.children.forEach((child, key) => {
                if (child.short_id === action.payload.childShortId) {
                    index = key;
                }
            });

            return {
                children: [
                    ...state.children.slice(0, index),
                    ...state.children.slice(index + 1)
                ]
            };

        default:
            return state;
    }
};
