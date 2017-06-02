export const ActionTypes = {
    ADD_TO_CART: '[Shopping-cart] Add new item to cart',
    REMOVE_FROM_CART: '[Shopping-cart] Remove item from cart'
};

export class AddToCart {
    type = ActionTypes.ADD_TO_CART;

    constructor(public payload: Object) { }
}

export class RemoveFromCart {
    type = ActionTypes.REMOVE_FROM_CART;

    constructor(public payload: Object) { }
}

export type Actions
    = AddToCart;
