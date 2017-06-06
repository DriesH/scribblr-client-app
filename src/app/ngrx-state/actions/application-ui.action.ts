export const ActionTypes = {
    ADD_NEW_CHILD_ACTIVE: '[Application-ui] Adding new child modal is active',
    NEW_ERROR_MESSAGE: '[Application-ui] Show new error message',
    CLEAR_ERROR_STATE: '[Application-ui] Clear errors from UI'
};

export class AddNewChildActive {
    type = ActionTypes.ADD_NEW_CHILD_ACTIVE;

    constructor(public payload: Object) { }
}

export class ShowErrorMessage {
     type = ActionTypes.NEW_ERROR_MESSAGE;

    constructor(public payload: Object) { }
}

export class ClearErrors {
    type = ActionTypes.CLEAR_ERROR_STATE;

    constructor(public payload: Object) { }
}

export type Actions
    = AddNewChildActive;
