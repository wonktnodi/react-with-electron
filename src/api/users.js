import md5 from 'md5';
import * as apiConfig from './config';

import { post } from './utils';

const login = ({ username, password, dispatch }) => {
  password = md5(password);
  const url = `${apiConfig.apiHost}/${apiConfig.apiLogin}`;
  return post({ url, data: { username, password }, dispatch });
};

export default {
  login,
};
