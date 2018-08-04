import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import Authorized from '../../utils/Authorized';
import SiderMenu from '../../components/SiderMenu';
import GlobalHeader from '../../components/GlobalHeader';

import { generateRoutes } from '../../routes';
import { getMenuData } from '../../routes/menu';

import { userLogout, changeLayoutCollapse } from '../../actions';
import logo from '../../assets/logo.svg';

const { Header, Content } = Layout;

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  const childResult = {};

  menuData.forEach(i=>{
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  });
  // for (const i of menuData) {
  //   if (!routerData[i.path]) {
  //     result[i.path] = i;
  //   }
  //   if (i.children) {
  //     Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
  //   }
  // }
  return Object.assign({}, routerData, result, childResult);
};

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

@connect(
  (/* state */) => ({ user, global = {} }) => ({
    collapsed: global.collapsed,
    currentUser: user.currentUser,
  }),
  dispatch => bindActionCreators({ userLogout }, dispatch)
)
class App extends Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };

  state = {
    collapsed: false,
    isMobile,
  };

  getChildContext() {
    const { location, routerData } = this.props;
    const crumbData = getBreadcrumbNameMap(getMenuData(), routerData);
    return {
      location,
      breadcrumbNameMap: crumbData,
    };
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getPageTitle = () => {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Dashboard';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - ${title}`;
    }
    return title;
  };

  handleMenuCollapse = collapsed => {
    // const { dispatch } = this.props;
    changeLayoutCollapse(collapsed);
    this.setState({
      collapsed,
    });
  };

  handleMenuClick = ({ key }) => {
    const { userLogout: funcLogout, dispatch } = this.props;
    if (key === 'triggerError') {
      dispatch(push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      funcLogout();
    }
  };

  render() {
    const {
      currentUser,
      // collapsed,
      // fetchingNotices,
      // notices,
      // routerData,
      match,
      location,
    } = this.props;
    const { collapsed, isMobile: mb } = this.state;
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={mb}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              // fetchingNotices={fetchingNotices}
              // notices={notices}
              collapsed={collapsed}
              isMobile={mb}
              // onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              // onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>{generateRoutes(match.path)}</Content>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>{params => <div className={classNames(params)}>{layout}</div>}</ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default App;
