import * as types from './types';
import effects from './effects';

const requestData = category => ({
  type: types.LOADING_SHOW,
  category,
});

const receiveData = category => ({
  type: types.LOADING_HIDE,
  category,
});

export const fetchData = (stateName, data) => async dispatch => {
  const executor = effects[stateName];
  if (!executor) {
    console.log(`effect[${stateName}] is undefined`);
    return undefined;
  }
  try {
    dispatch(requestData(stateName));
    const resp = await executor({ ...data, dispatch });
    dispatch(receiveData(stateName));
    // console.log(resp);
    return resp && resp.data;
  } catch (error) {
    console.log(`effect[${stateName}] is catch error: `, error);
    return undefined;
  }
};

export default {
  requestData,
  receiveData,
};
