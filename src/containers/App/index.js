import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
// import { Link } from 'react-router-dom';

import SiderMenu from '../../components/SiderMenu';
import GlobalHeader from '../../components/GlobalHeader';

import { generateRoutes } from '../../routes';
import { getMenuData } from '../../routes/menu';

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
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};

class App extends Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };

  state = {
    collapsed: false,
    isMobile: false,
  };

  getChildContext() {
    const { location, routerData } = this.props;
    const crumbData = getBreadcrumbNameMap(getMenuData(), routerData)
    return {
      location,
      breadcrumbNameMap: crumbData,
    };
  }

  handleMenuCollapse = collapsed => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'global/changeLayoutCollapsed',
    //   payload: collapsed,
    // });
    this.setState({
      collapsed: collapsed,
    });
  };

  handleMenuClick = ({ key }) => {
    // const { dispatch } = this.props;
    // if (key === 'triggerError') {
    //   dispatch(routerRedux.push('/exception/trigger'));
    //   return;
    // }
    // if (key === 'logout') {
    //   dispatch({
    //     type: 'login/logout',
    //   });
    // }
  };

  getPageTitle = () => {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Ant Design Pro`;
    }
    return title;
  };

  render() {
    const {
      // currentUser,
      // collapsed,
      // fetchingNotices,
      // notices,
      // routerData,
      match,
      location,
    } = this.props;
    const { collapsed, isMobile: mb } = this.state;
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          // Authorized={Authorized}
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
              // currentUser={currentUser}
              // fetchingNotices={fetchingNotices}
              // notices={notices}
              collapsed={collapsed}
              isMobile={mb}
              // onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              // onMenuClick={this.handleMenuClick}
              // onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>{generateRoutes(match.path)}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
