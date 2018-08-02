import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import adapter from 'webrtc-adapter';

import Authorized from './utils/Authorized';
import configureStore, { history } from './stores/configureStore';

import { getRouterData } from './routes';
import 'antd/dist/antd.css';
import './index.less';
import App from './containers/App';
import User from './layouts/UserLayout';

import { Page404 } from './components/Exception/pages';

if (window) {
  window.adapter = adapter;
}

const store = configureStore();
const { AuthorizedRoute } = Authorized;

function content() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={User} />
          <AuthorizedRoute
            path="/"
            render={props => <App {...props} routerData={getRouterData()} />}
            authority={['admin', 'user']}
            redirectPath="/user"
          />
          {/* <Route path="/" render={props => <App {...props} routerData={getRouterData()} />} /> */}
          <Route component={Page404} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

ReactDOM.render(content(), document.getElementById('root'));
