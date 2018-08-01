import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox, Alert } from 'antd';
// import { push } from 'connected-react-router';
import Login from '../../components/Login';
import styles from './Login.module.less';

import { userLogin } from '../../actions';

const { Tab, UserName, Password, Submit } = Login;

@connect(
  ({ login, loading }) => ({ login, submitting: loading.effects['login/login'] }),
  dispatch => bindActionCreators({ userLogin }, dispatch)
)
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.userLogin('1111', '111111', type);
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} closable type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {login.status !== 200 &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>
            {'登录'}
          </Submit>
        </Login>
      </div>
    );
  }
}
