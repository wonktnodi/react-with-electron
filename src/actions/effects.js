import * as types from './types';

// import userApi from '../api/users';
import users from './users';
import lists from './lists';

export default {
  [types.USER_LOGIN]: users.login,
  [types.USER_LOGOUT]: users.logout,
  [types.USER_STATUS]: users.status,
  [types.LIST_DATA_FETCH]: lists.fetchList,
  [types.LIST_DATA_BASICS]: lists.fetchBasic,
};
