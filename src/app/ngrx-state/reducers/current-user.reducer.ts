import { Action } from '../action.interface';
import { User } from '../../models/user';

import * as userActions from '../actions/current-user.action';

export interface State {
    isAuth: boolean;
    user: User;
};

export const initialState: State = {
    isAuth: false,
    user: {
        id: 0,
        short_id: '',
        first_name: '',
        last_name: '',
        email: '',
        street_name: '',
        house_number: '',
        city: '',
        postal_code: '',
        country: ''
    }
};

export function CurrentUserReducer (state = initialState, action: Action) {
    switch (action.type) {
        case userActions.ActionTypes.SUCCESS_LOGIN:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};