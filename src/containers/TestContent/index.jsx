import React from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export class FirstPage extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    console.log('rendering FirstPage');
    return (
      <PageHeaderLayout title="页面标题">
        <div> 这是第一个页面 </div>
      </PageHeaderLayout>
    );
  }
}

export class SecondPage extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    console.log('rendering SecondPage');
    return (
      <PageHeaderLayout title="页面标题">
        <div> 这是第二个页面 </div>
      </PageHeaderLayout>
    );
  }
}

export class OtherPage extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    console.log('rendering OtherPage');
    return (
      <PageHeaderLayout title="页面标题">
        <div> 这是第其他页面 </div>
      </PageHeaderLayout>
    );
  }
}

export default FirstPage;
