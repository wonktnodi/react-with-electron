import * as apiConfig from './config';

import { get } from './utils';

const getList = params => {
  const url = `${apiConfig.apiHost}/${apiConfig.apiList}`;
  return get({ url, params });
};

const getBasicData = params => {
  const url = `${apiConfig.apiHost}/${apiConfig.apiBasicData}`;
  return get({ url, params });
};

export default {
  getList,
  getBasicData,
};
