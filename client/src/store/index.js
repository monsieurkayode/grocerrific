/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [thunk];
let enhancers = [];

/**
 *
 * @description configures the redux store with
 * middlewares and enhancers for different environments
 *
 * @function configureStore
 *
 * @returns {object}
 */
const configureStore = () => {
  if (process.env.NODE_ENV === 'development') {
    enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__();
  }

  const createStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(createStore);
  return createStoreWithMiddleware(rootReducer, enhancers);
};

export default configureStore();
