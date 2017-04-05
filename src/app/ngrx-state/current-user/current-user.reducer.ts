import { createSelector } from 'reselect';
import { User } from '../../models/user';
import * as user from './current-user.action';

export interface State {
    isAuth: boolean;
    user: User;
};

export const initialState: State = {
    isAuth: false,
    user: {
        id: 0,
        first_name: '',
        last_name: '',
        short_id: '',
        email: '',
        street_name: '',
        house_number: '',
        city: '',
        postal_code: 0,
        country: '',
        JWTToken: ''
    }
};

export function reducer(state = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.ActionTypes.IS_AUTH: {
            const authUser = action.payload;

            return {
                isAuth: true,
                user: Object.assign({}, state.user, authUser)
            };
        }

        default: {
            return state;
        }
    }
};


export const getIsAuth = (state: State) => state.isAuth;

export const getUserModel = (state: State) => state.user;

export const getUser = createSelector(getIsAuth, getUserModel, (isAuth, user) => {
    return {
        isAuth: isAuth,
        user: user
    };
});
