import { Action } from './action.interface';

export interface Reducer<T> {
  (state: T, action: Action): T;
}
