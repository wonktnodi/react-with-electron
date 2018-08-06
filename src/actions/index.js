import * as types from './types';
import { doAsyncAction, doAction, callApi } from './common';

export const userLogin = (username, password, type) => {
  const stateName = types.USER_LOGIN;
  return doAsyncAction(stateName, { username, password, type });
};

export const userLogout = () => {
  const stateName = types.USER_LOGOUT;
  return doAction(stateName);
};

export const getListsData = (params, callback) => {
  const stateName = types.LIST_DATA_FETCH;
  return callApi(stateName, params||{}, callback);
};

export const userStatus = () => {
  const stateName = types.USER_STATUS;
  return doAsyncAction(stateName);
};

export const getListBasics = (params, callback) => {
  const stateName = types.LIST_DATA_BASICS;
  return callApi(stateName, params||{}, callback);
};

// export const userLogout = () => dispatch => {
//   try {
//     const urlParams = new URL(window.location.href);
//     console.log(urlParams);
//     //     const pathname = yield select(state => state.routing.location.pathname);
//     //     // add the parameters in the url
//     //     urlParams.searchParams.set('redirect', pathname);
//     //     window.history.replaceState(null, 'login', urlParams.href);
//   } finally {
//     dispatch(push('/user/login'));
//   }
// };

export const changeLayoutCollapse = collapsed => dispatch => {
  dispatch({
    type: types.GLOBAL_CHANGE_LAYOUT_COLLAPSED,
    payload: collapsed,
  });
};
