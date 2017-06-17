export const ActionTypes = {
    ADD_TO_CART: '[Shopping-cart] Add new item to cart',
    CHECK_BEFORE_ADD: '[Shopping-cart] Check on empty pages before adding to cart',
    REMOVE_FROM_CART: '[Shopping-cart] Remove item from cart',
    CLEAR_CART: '[Shopping-cart] Clear cart'
};

export class AddToCart {
    type = ActionTypes.ADD_TO_CART;

    constructor(public payload: Object) { }
}

export class CheckBeforeAdd {
    type = ActionTypes.CHECK_BEFORE_ADD;

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
