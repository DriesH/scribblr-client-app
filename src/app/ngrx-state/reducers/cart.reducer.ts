import { Action } from '../action.interface';

import * as CartActions from '../actions/cart.action';

export interface State {
    items_in_cart: Array<any>;
};

export const initialState: State = {
    items_in_cart: []
};

export function CartReducer(state = initialState, action: Action) {
    let index = 0;

    switch (action.type) {
        case CartActions.ActionTypes.ADD_TO_CART:
            return {
                ...state,
                items_in_cart: [
                    ...state.items_in_cart,
                    { ...action.payload.new_item, amount: 1 }
                ]
            };

        case CartActions.ActionTypes.REMOVE_FROM_CART:
            index = 0;

            state.items_in_cart.forEach((item, key) => {
                if (item.short_id === action.payload.item.short_id) {
                    index = key;
                }
            });

            return {
                ...state,
                items_in_cart: [
                    ...state.items_in_cart.slice(0, index),
                    ...state.items_in_cart.slice(index + 1)
                ]
            };


        case CartActions.ActionTypes.CLEAR_CART:
            return {
                items_in_cart: []
            };


        default:
            return state;
    }
};
