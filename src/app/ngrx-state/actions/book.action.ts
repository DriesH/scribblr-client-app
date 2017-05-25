export const ActionTypes = {
    BOOK_DATA_RECEIVED: '[Book] Received book data',
    POSTS_DATA_RECEIVED: '[Book] Received posts data',
    UPDATE_BOOK_PAGE: '[Book] Update page of book'
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

export type Actions
    = BookDataReceived
    | PostsDataReceived;
