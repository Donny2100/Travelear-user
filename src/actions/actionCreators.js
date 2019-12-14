import { bindActionCreators } from 'redux';
import * as actions from './index';

import store from '../store';

const { dispatch } = store;

export const Actions = bindActionCreators(actions, dispatch);
