export const ActionTypes = {
    SUCCESS_DOWNLOAD_CHILDREN: '[Children] Successfull downloaded children',
};

export class SuccessfullDownloadChildren {
    type = ActionTypes.SUCCESS_DOWNLOAD_CHILDREN;

    constructor(public payload: Object) { }
}

export type Actions
    = SuccessfullDownloadChildren;
