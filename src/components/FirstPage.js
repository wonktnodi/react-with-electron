/**
 * Created by wangqiangli on 2017/11/12.
 */
import React from "react";

export class FirstPage extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    console.log("rendering FirstPage");
    return <div>这是第一个页面</div>;
  }
}

export class SecondPage extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    console.log("rendering SecondPage");
    return <div>这是第二个页面</div>;
  }
}

export class OtherPage extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    console.log("rendering OtherPage");
    return <div>这是其他页面</div>;
  }
}

export default FirstPage;
