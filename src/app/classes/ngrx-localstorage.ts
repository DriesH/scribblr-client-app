import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { localStorageSync } from 'ngrx-store-localstorage';

import { CurrentUserReducer } from '../ngrx-state/reducers/current-user.reducer';
import { ChildReducer } from '../ngrx-state/reducers/child.reducer';
import { ApplicationUIReducer } from '../ngrx-state/reducers/application-ui.reducer';
import { QuoteReducer } from '../ngrx-state/reducers/quote.reducer';
import { BookReducer } from '../ngrx-state/reducers/book.reducer';
import { FlipBookReducer } from '../ngrx-state/reducers/flip-book.reducer';
import { CartReducer } from '../ngrx-state/reducers/cart.reducer';

export function localStorageNgrx () {
    return compose(
        localStorageSync({ keys: ['CART'], rehydrate: true }),
        combineReducers
    )({
        CURRENT_USER: CurrentUserReducer,
        CURRENT_CHILDREN: ChildReducer,
        APPLICATION_UI: ApplicationUIReducer,
        QUOTES: QuoteReducer,
        BOOK: BookReducer,
        FLIP_BOOK: FlipBookReducer,
        CART: CartReducer
    });
}
