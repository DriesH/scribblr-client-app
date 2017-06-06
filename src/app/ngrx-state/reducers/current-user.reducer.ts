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
        id: null,
        short_id: null,
        first_name: null,
        last_name: null,
        email: null,
        street_name: null,
        house_number: null,
        city: null,
        postal_code: null,
        country: null,
        has_seen_book_tutorial: null,
        achievements: []
    }
};

export function CurrentUserReducer (state = initialState, action: Action) {
    switch (action.type) {
        case userActions.ActionTypes.SUCCESS_LOGIN:
            return Object.assign({}, state, action.payload);

        case userActions.ActionTypes.UPDATE_USER:
            return Object.assign({}, state, {
                user: action.payload.user
            });

        default:
            return state;
    }
};
