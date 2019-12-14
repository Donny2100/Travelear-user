import {createAction} from 'redux-actions';

export const USER_SET = 'USER_SET';
export const AUTH_USER_SET = 'AUTH_USER_SET';

export const userSet = createAction(USER_SET, user => user);
export const authUserSet = createAction(AUTH_USER_SET, authUser => authUser);
