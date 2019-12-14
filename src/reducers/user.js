import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {USER_SET} from '../actions';

const initialState = Record({
    user: null,
})();
  
export default handleActions({
    [USER_SET]: (state, action) => state.set('user', action.payload),
}, initialState);
