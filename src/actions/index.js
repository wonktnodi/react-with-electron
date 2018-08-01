import * as types from './types';
import { fetchData } from './common';

export const userLogin = (username, password, type) => {
  const stateName = types.USER_LOGIN;
  return fetchData(stateName, { username, password, type });
};

export const userLogout = () => {};
