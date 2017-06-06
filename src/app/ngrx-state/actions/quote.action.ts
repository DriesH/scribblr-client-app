export const ActionTypes = {
    NEW_QUOTE: '[Quote] New quote added',
};

export class NewQuote {
    type = ActionTypes.NEW_QUOTE;

    constructor(public payload: Object) { }
}

export type Actions
    = NewQuote;
