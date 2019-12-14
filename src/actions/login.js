import {auth, firestore} from '../services'
import {userSet} from './userset';

export const LOGIN = 'LOGIN';

export const login = inputuser => async (dispatch) => {
    console.log('log function');
    let authuser = await auth.doSignInWithEmailAndPassword(inputuser.email, inputuser.password);
    let user = await firestore.getUser(authuser.uid);
    dispatch(userSet(user));
};
