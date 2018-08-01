import * as types from './types';

// import userApi from '../api/users';
import users from './users';

export default {
  [types.USER_LOGIN]: users.login,
  [types.USER_LOGOUT]: users.logout,
};
