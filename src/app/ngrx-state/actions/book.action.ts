export const ActionTypes = {
    BOOK_DATA_RECEIVED: '[Book] Received book data',
    POSTS_DATA_RECEIVED: '[Book] Received posts data'
};

export class BookDataReceived {
    type = ActionTypes.BOOK_DATA_RECEIVED;

    constructor(public payload: Object) { }
}

export class PostsDataReceived {
    type = ActionTypes.POSTS_DATA_RECEIVED;

    constructor(public payload: Object) { }
}

export type Actions
    = BookDataReceived
    | PostsDataReceived;
