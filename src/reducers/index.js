import { combineReducers } from 'redux';

import { room } from './room';
import global from './global';
import login from './login';
import loading from './loading';
import user from './user';

export default combineReducers({
  global,
  login,
  user,
  room,
  loading,
});
