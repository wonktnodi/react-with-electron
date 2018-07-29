import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { getRouterData } from './routes';
import 'antd/dist/antd.css';
import './index.less';
import App from './containers/App';
import Login from './components/Login';
import { Page403, Page404, Page500 } from './components/Exception/pages';

function content() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/app" render={props => <App {...props} routerData={getRouterData()} />} />
        <Route path="/login" component={Login} />
        <Route exact path="/403" component={Page403} />
        <Route exact path="/404" component={Page404} />
        <Route exact path="/500" component={Page500} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(content(), document.getElementById('root'));
