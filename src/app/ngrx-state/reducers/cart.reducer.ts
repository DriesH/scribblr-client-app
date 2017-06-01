import { Action } from '../action.interface';

import * as CartActions from '../actions/cart.action';

export interface State {
    items_in_cart: Array<any>;
};

export const initialState: State = {
    items_in_cart: []
};

export function CartReducer(state = initialState, action: Action) {
    switch (action.type) {
        case CartActions.ActionTypes.ADD_TO_CART:
            return {
                ...state,
                items_in_cart: [
                    ...state.items_in_cart,
                    action.payload.new_item
                ]
            };

        default:
            return state;
    }
};
