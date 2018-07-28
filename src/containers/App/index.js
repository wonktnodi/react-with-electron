import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { generateRoutes } from '../../routes';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <Link to={'/app/first'} replace>
                First
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <Link to={'/app/second'} replace>
                second
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              // margin: "24px 16px",
              padding: 8,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {/* <Switch>{routesData}</Switch> */}
            {generateRoutes()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
