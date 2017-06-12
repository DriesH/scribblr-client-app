export const ActionTypes = {
    POSTS_LOADED: '[Quote] Posts loaded',
    NEW_QUOTE: '[Quote] New quote added',
    UPDATE_QUOTE: '[Quote] Update quote',
    CLEAR_QUOTES: '[Quote] Clear quote fields',
    REMOVE_QUOTE: '[Quote] Remove quote'
};

export class PostsLoaded {
    type = ActionTypes.POSTS_LOADED;

    constructor(public payload: Object) { }
}


export class NewQuote {
    type = ActionTypes.NEW_QUOTE;

    constructor(public payload: Object) { }
}

export class UpdateQuote {
    type = ActionTypes.UPDATE_QUOTE;

    constructor(public payload: Object) { }
}

export class ClearQuoteState {
    type = ActionTypes.CLEAR_QUOTES;

    constructor(public payload: Object) {
        payload = {
            newQuote: {},
            updateQuote: {}
        };
    }
}

export class RemoveQuote {
    type = ActionTypes.REMOVE_QUOTE;

    constructor(public payload: Object) { }
}

export type Actions
    = NewQuote;
