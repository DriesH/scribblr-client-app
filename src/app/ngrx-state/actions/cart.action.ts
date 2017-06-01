export const ActionTypes = {
    ADD_TO_CART: '[Shopping-cart] Adding new child modal is active'
};

export class AddToCart {
    type = ActionTypes.ADD_TO_CART;

    constructor(public payload: Object) { }
}

export type Actions
    = AddToCart;
