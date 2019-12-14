import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {AUTH_USER_SET} from '../actions';

const initialState = Record({
  authUser: null,
})();

export default handleActions({
    [AUTH_USER_SET]: (state, action) => {console.log(action.payload); return state.set('authUser', action.payload);},
}, initialState);
