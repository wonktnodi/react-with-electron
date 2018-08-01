import * as types from './types';
import userApi from '../api/users';

export const internalLogin = async data => {
  const { type, dispatch } = data;
  const resp = await userApi.login(data);
  console.log('user login1:', resp);
  dispatch({
    type: types.USER_CHANGE_LOGIN_STATUS,
    payload: resp.data,
  });
  const resp1 = await userApi.login(data);
  console.log('user login2:', resp1);
  resp.data.type = type;
  return resp;
};

export const process = ({ data, dispatch }) => {
  if (data.error) {
    console.log('get error: ', data.error);
    dispatch({
      type: types.USER_LOGIN,
      payload: { error: data.error, data: data.data },
    });
    return;
  }

  dispatch({
    type: types.USER_SAVE_INFO,
    payload: data.data,
  });
};

export const intarnalLogout = 0;

export default {
  action: internalLogin,
  process,
};
