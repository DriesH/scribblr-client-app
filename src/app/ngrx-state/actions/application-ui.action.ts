export const ActionTypes = {
    ADD_NEW_CHILD_ACTIVE: '[Application-ui] Adding new child modal is active'
};

export class AddNewChildActive {
    type = ActionTypes.ADD_NEW_CHILD_ACTIVE;

    constructor(public payload: Object) { }
}

export type Actions
    = AddNewChildActive;
