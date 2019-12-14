import {auth} from '../services'
import {userSet} from './userset';

export const LOGOUT = 'LOGOUT';

export const logout = () => async dispatch => {
    await auth.doSignOut();
    dispatch(userSet(null));
};
