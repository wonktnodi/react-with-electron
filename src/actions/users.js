import { push } from 'connected-react-router';
import * as types from './types';
import userApi from '../api/users';
import { reloadAuthorized } from '../utils/Authorized';
import { roleToAuthority } from '../utils/authority';

const internalLogin = async data => {
  const { type } = data;
  const resp = await userApi.login(data);
  resp.data.type = type;
  return resp;
};

const loginProcess = ({ data, dispatch }) => {
  if (data.error) {
    dispatch({
      type: types.USER_LOGIN,
      payload: { error: data.error, data: data.data },
    });
    return;
  }

  dispatch({
    type: types.USER_CHANGE_LOGIN_STATUS,
    payload: { status: 200, type: data.data.type, currentAuthority: roleToAuthority(data.data.role) },
  });

  dispatch({
    type: types.USER_SAVE_INFO,
    payload: data.data,
  });
  reloadAuthorized();
  dispatch(push('/'));
};

const logout = ({ dispatch }) => {
  try {
    // const urlParams = new URL(window.location.href);
    // console.log(urlParams);
    //     const pathname = yield select(state => state.routing.location.pathname);
    //     // add the parameters in the url
    //     urlParams.searchParams.set('redirect', pathname);
    //     window.history.replaceState(null, 'login', urlParams.href);
  } finally {
    dispatch({
      type: types.USER_CHANGE_LOGIN_STATUS,
      payload: { status: 200, type: 'account', currentAuthority: 'guest' },
    });
    reloadAuthorized();
    // redirect to login page.
    dispatch(push('/user/login'));
  }
};

const userStatus= async () => {
  const resp = await userApi.status();
  return resp;
};

const userStatusProcess = ({ data, dispatch }) => {
  if (data.error) {
    // dispatch({
    //   type: types.USER_LOGIN,
    //   payload: { error: data.error, data: data.data },
    // });
    return;
  }

  dispatch({
    type: types.USER_CHANGE_LOGIN_STATUS,
    payload: { status: 200, currentAuthority: roleToAuthority(data.data.role) },
  });

  dispatch({
    type: types.USER_SAVE_INFO,
    payload: data.data,
  });
  reloadAuthorized();
};

export default {
  login: {
    action: internalLogin,
    process: loginProcess,
  },
  logout: {
    action: logout,
  },
  status: {
    action: userStatus,
    process: userStatusProcess,
  }
};
