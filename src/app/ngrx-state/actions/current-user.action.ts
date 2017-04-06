export const ActionTypes = {
    SUCCES_LOGIN: '[User] Successfull authenticated',
};

export class SuccesfullLogin {
    type = ActionTypes.SUCCES_LOGIN;

    constructor(payload: Object) { }
}
