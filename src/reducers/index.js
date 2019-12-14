import { combineReducers } from 'redux';
import userReducer from './user';
import session from './session';

const rootReducer = combineReducers({
  userState: userReducer,
  sessionState: session,
});

export default rootReducer;
