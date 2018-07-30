import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import rootReducer from '../reducers';

export const history = createHashHistory();

// eslint-disable-next-line
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || // eslint-disable-line
  compose;

const configureStore = initialState => {
  const middlewares = [logger, thunk, routerMiddleware(history)];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  return createStore(connectRouter(history)(rootReducer), initialState, enhancer);
};

export default configureStore;
