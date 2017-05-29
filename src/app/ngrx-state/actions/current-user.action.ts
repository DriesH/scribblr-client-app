export const ActionTypes = {
    SUCCESS_LOGIN: '[User] Successfull authenticated',
    TOKEN_PRESENT: '[User] Token is present',
    ERROR_LOGIN: '[User] Error authentication',
    UPDATE_USER: '[User] Updated user information'
};

export class SuccessfullLogin {
    type = ActionTypes.SUCCESS_LOGIN;

    constructor(public payload: Object) { }
}

export class ErrorLogin {
    type = ActionTypes.ERROR_LOGIN;

    constructor(public payload: Object) { }
}

export class TokenIsPresent {
    type = ActionTypes.TOKEN_PRESENT;

    constructor(public payload: string) { }
}

export class UpdateUser {
    type = ActionTypes.UPDATE_USER;

    constructor(public payload: Object) { }
}

export type Actions
  = SuccessfullLogin
  | ErrorLogin
  | TokenIsPresent;
