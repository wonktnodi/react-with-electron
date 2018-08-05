import md5 from 'md5';
import * as apiConfig from './config';

import { post, get } from './utils';

const login = ({ username, password, dispatch }) => {
  password = md5(password);
  const url = `${apiConfig.apiHost}/${apiConfig.apiLogin}`;
  return post({ url, data: { username, password }, dispatch });
};

const status = () => {
  const url = `${apiConfig.apiHost}/${apiConfig.apiUserStatus}`;
  return get({ url });
};

export default {
  login,
  status,
};
