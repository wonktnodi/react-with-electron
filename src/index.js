import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import adapter from 'webrtc-adapter';
import FetchMock from 'react-fetch-mock'; // eslint-disable-line

import configureStore, { history } from './stores/configureStore';

import { getRouterData } from './routes';
import 'antd/dist/antd.css';
import './index.less';
import App from './containers/App';
import User from './layouts/UserLayout';

import { Page403, Page404, Page500 } from './components/Exception/pages';

if (window) {
  window.adapter = adapter;
}

// global setting
if (process.env.NODE_ENV === 'development') {
  window.fetch = new FetchMock(require('./__mocks__')).fetch; // eslint-disable-line
}

const store = configureStore();

function content() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/app" render={props => <App {...props} routerData={getRouterData()} />} />
          <Route path="/user" component={User} />
          <Route exact path="/403" component={Page403} />
          <Route exact path="/404" component={Page404} />
          <Route exact path="/500" component={Page500} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

ReactDOM.render(content(), document.getElementById('root'));
