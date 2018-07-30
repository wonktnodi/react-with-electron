import { combineReducers } from 'redux';

import { room } from './room';
import global from './global';
import login from './login';
import loading from './loading';

export default combineReducers({
  global,
  login,
  room,
  loading,
});
