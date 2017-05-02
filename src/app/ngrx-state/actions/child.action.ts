export const ActionTypes = {
    SUCCESS_DOWNLOAD_CHILDREN: '[Children] Successfull downloaded children',
    EDIT_CHILD: '[Children] Edited child',
    DELETE_CHILD: '[Children] Deleted child'
};

export class SuccessfullDownloadChildren {
    type = ActionTypes.SUCCESS_DOWNLOAD_CHILDREN;

    constructor(public payload: Object) { }
}

export class EditChild {
    type = ActionTypes.EDIT_CHILD;

    constructor(public payload: Object) { }
}

export class DeleteChild {
    type = ActionTypes.DELETE_CHILD;

    constructor(public payload: Object) { }
}

export type Actions
    = SuccessfullDownloadChildren
    | EditChild
    | DeleteChild;
