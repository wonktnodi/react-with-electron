import { push } from 'connected-react-router';
import * as types from './types';
import userApi from '../api/users';
import { reloadAuthorized } from '../utils/Authorized';
import { roleToAuthority } from '../utils/authority';

export const internalLogin = async data => {
  const { type } = data;
  const resp = await userApi.login(data);
  // console.log('user login1:', resp);
  // // dispatch({
  // //   type: types.USER_CHANGE_LOGIN_STATUS,
  // //   payload: resp.data,
  // // });
  // const resp1 = await userApi.login(data);
  // console.log('user login2:', resp1);
  resp.data.type = type;
  return resp;
};

export const process = ({ data, dispatch }) => {
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
    const urlParams = new URL(window.location.href);
    console.log(urlParams);
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
    dispatch(push('/user/login'));
  }
};

export default {
  login: {
    action: internalLogin,
    process,
  },
  logout: {
    action: logout,
  },
};
