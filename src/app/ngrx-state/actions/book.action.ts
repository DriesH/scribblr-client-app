export const ActionTypes = {
    BOOK_DATA_RECEIVED: '[Book] Received book data',
    POSTS_DATA_RECEIVED: '[Book] Received posts data',
    UPDATE_BOOK_PAGE: '[Book] Update page of book',
    REMOVE_FROM_BOOK: '[Book] Remove page from book',
    REMOVE_FROM_POST_LIST: '[Book] Remove page from post list',
    ADD_TO_POST_LIST: '[Book] Add page to post list'
};

export class BookDataReceived {
    type = ActionTypes.BOOK_DATA_RECEIVED;

    constructor(public payload: Object) { }
}

export class PostsDataReceived {
    type = ActionTypes.POSTS_DATA_RECEIVED;

    constructor(public payload: Object) { }
}

export class UpdateBookPage {
    type = ActionTypes.UPDATE_BOOK_PAGE;

    constructor(public payload: Object) { }
}

export class RemoveFromBook {
    type = ActionTypes.REMOVE_FROM_BOOK;

    constructor(public payload: Object) { }
}

export class RemoveFromPostList {
    type = ActionTypes.REMOVE_FROM_POST_LIST;

    constructor(public payload: Object) { }
}

export class AddToPostList {
    type = ActionTypes.ADD_TO_POST_LIST;

    constructor(public payload: Object) { }
}

export type Actions
    = BookDataReceived
    | PostsDataReceived
    | UpdateBookPage
    | RemoveFromBook
    | RemoveFromPostList
    | AddToPostList;
