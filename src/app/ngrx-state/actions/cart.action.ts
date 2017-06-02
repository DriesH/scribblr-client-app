export const ActionTypes = {
    ADD_TO_CART: '[Shopping-cart] Add new item to cart',
    REMOVE_FROM_CART: '[Shopping-cart] Remove item from cart',
    CLEAR_CART: '[Shopping-cart] Clear cart'
};

export class AddToCart {
    type = ActionTypes.ADD_TO_CART;

    constructor(public payload: Object) { }
}

export class RemoveFromCart {
    type = ActionTypes.REMOVE_FROM_CART;

    constructor(public payload: Object) { }
}

export class ClearCart {
    type = ActionTypes.CLEAR_CART;

    constructor(public payload: Object) { }
}

export type Actions
    = AddToCart
    | RemoveFromCart
    | ClearCart;
