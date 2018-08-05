import listsApi from '../api/lists';

const fetchList = (params) => listsApi.getList(params);

export default {
  fetchList: {
    action: fetchList,
  },
};
