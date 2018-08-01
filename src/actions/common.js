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

export const doAction = (actionName, data) => dispatch => {
  const executor = effects[actionName];
  console.log(effects);
  if (!executor) {
    console.log(`effect[${actionName}] is undefined`);
    return;
  }

  try {
    executor.action({ ...data, dispatch });
  } catch (error) {
    console.log(`do action[${actionName}] is catch error: `, error);
  }
};

export const fetchData = (stateName, data) => async dispatch => {
  const executor = effects[stateName];
  if (!executor) {
    console.log(`effect[${stateName}] is undefined`);
    return;
  }
  try {
    dispatch(requestData(stateName));
    const resp = await executor.action({ ...data, dispatch });
    dispatch(receiveData(stateName));

    if (executor.process) {
      executor.process({ data: resp, dispatch });
    }

    return;
  } catch (error) {
    console.log(`effect[${stateName}] is catch error: `, error);
    dispatch(receiveData(stateName));
  }
};

export default {
  requestData,
  receiveData,
};
