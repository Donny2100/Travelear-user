import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, promiseMiddleware()),
  ));

  return store;
}

export default configureStore;
