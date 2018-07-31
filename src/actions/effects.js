import * as types from './types';

import userApi from '../api/users';

export default {
  [types.USER_LOGIN]: userApi.login,
};
