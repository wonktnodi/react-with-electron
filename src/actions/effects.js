import * as types from './types';

// import userApi from '../api/users';
import users from './users';
import lists from './lists';

export default {
  [types.USER_LOGIN]: users.login,
  [types.USER_LOGOUT]: users.logout,
  [types.LIST_DATA_FETCH]: lists.fetchList,
};
