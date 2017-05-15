export const ActionTypes = {
    ADD_NEW_CHILD_ACTIVE: '[Application-ui] Adding new child modal is active',
    NEW_ERROR_MESSAGE: '[Application-ui] Show new error message'
};

export class AddNewChildActive {
    type = ActionTypes.ADD_NEW_CHILD_ACTIVE;

    constructor(public payload: Object) { }
}

export class ShowErrorMessage {
     type = ActionTypes.NEW_ERROR_MESSAGE;

    constructor(public payload: Object) { }
}

export type Actions
    = AddNewChildActive;
