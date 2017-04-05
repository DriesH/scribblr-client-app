import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { type } from '../util';

export const ActionTypes = {
    IS_AUTH: type('[User] Is authenticated'),
};

export class IsAuthenticatedAction implements Action {
    type = ActionTypes.IS_AUTH;

    constructor(public payload: User) { }
}

export type Actions
    = IsAuthenticatedAction;
