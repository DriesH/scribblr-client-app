export const ActionTypes = {
    BOOK_DATA_RECEIVED: '[Flipbook] Received book data',
    POSTS_DATA_RECEIVED: '[Flipbook] Received posts data',
    UPDATE_BOOK_PAGE: '[Flipbook] Update page of book',
    REMOVE_FROM_BOOK: '[Flipbook] Remove page from book',
    REMOVE_FROM_POST_LIST: '[Flipbook] Remove page from post list',
    ADD_TO_POST_LIST: '[Flipbook] Add page to post list'
};

export class FlipBookDataReceived {
    type = ActionTypes.BOOK_DATA_RECEIVED;

    constructor(public payload: Object) { }
}

export class FlipBookPostsDataReceived {
    type = ActionTypes.POSTS_DATA_RECEIVED;

    constructor(public payload: Object) { }
}

export class UpdateFlipBookPage {
    type = ActionTypes.UPDATE_BOOK_PAGE;

    constructor(public payload: Object) { }
}

export class RemoveFromFlipBook {
    type = ActionTypes.REMOVE_FROM_BOOK;

    constructor(public payload: Object) { }
}

export class RemoveFromFlipBookPostList {
    type = ActionTypes.REMOVE_FROM_POST_LIST;

    constructor(public payload: Object) { }
}

export class AddToFlipBookPostList {
    type = ActionTypes.ADD_TO_POST_LIST;

    constructor(public payload: Object) { }
}

export type Actions
    = FlipBookDataReceived
    | FlipBookPostsDataReceived
    | UpdateFlipBookPage
    | RemoveFromFlipBook
    | RemoveFromFlipBookPostList
    | AddToFlipBookPostList;
