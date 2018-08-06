import listsApi from '../api/lists';

const fetchList = params => listsApi.getList(params);

const fetchBasicData = params => listsApi.getBasicData(params);

export default {
  fetchList: {
    action: fetchList,
  },
  fetchBasic: {
    action: fetchBasicData,
  },
};
