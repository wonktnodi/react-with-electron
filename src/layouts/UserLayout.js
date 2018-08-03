import React from 'react';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.module.less';
import logo from '../assets/logo.svg';
import Login from '../containers/User/Login';

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Dashboard';
    if (routerData && routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}`;
    }
    return title;
  }

  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>
                    {'Dashboard'}
                  </span>
                </Link>
              </div>
              <div className={styles.desc}>
                {'管理后台'}
              </div>
            </div>
            <Switch>
              <Route exact key="/user/login" path="/user/login" component={Login} />
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
