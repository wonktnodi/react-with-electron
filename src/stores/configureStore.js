import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// eslint-disable-next-line
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = (initialState) => {
  const middlewares = [logger, thunk];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;
