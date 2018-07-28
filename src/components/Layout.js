/**
 * Created by wangqiangli on 2017/11/12.
 */
import React from "react";
import { Layout, Menu, Icon } from "antd";
import {FirstPage, SecondPage} from "./FirstPage";
import { Route, Link, Switch } from "react-router-dom";

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const data = [
      <Route key="/app/first" path="/app/first" component={FirstPage} />,
      <Route key="/app/second" path="/app/second" component={SecondPage} />
    ];
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <Link to={"/app/first"}>First</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <Link to={"/app/second"}>second</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Switch>{data}</Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
