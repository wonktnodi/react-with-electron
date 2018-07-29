import { combineReducers } from 'redux';

import { room } from './room';
import global from './global';
import login from './login';

export default combineReducers({
  global,
  login,
  room,
});
