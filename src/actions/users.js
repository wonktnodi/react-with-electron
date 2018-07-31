import * as types from './types';
import { fetchData } from './common';

export const userLogin = (username, password) => {
  const stateName = types.USER_LOGIN;
  return fetchData(stateName, { username, password });
};

export const userLogout = () => {};
