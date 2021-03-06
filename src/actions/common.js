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

// return dispatch function, execute a action.
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

export const doAsyncAction = (stateName, data) => async dispatch => {
  const executor = effects[stateName];
  if (!executor) {
    console.log(`effect[${stateName}] is undefined`);
    return;
  }
  try {
    dispatch(requestData(stateName));
    const resp = await executor.action({ ...data});
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

export const callApi = (stateName, data, callback) => dispatch => {
  const executor = effects[stateName];
  if (!executor) {
    console.warn(`effect[${stateName}] is undefined`);
    return;
  }
  try {
    dispatch(requestData(stateName));
    const resp = executor.action({ ...data });
    console.log(resp);
    resp
      .then(res => {
        dispatch(receiveData(stateName));
        callback(res);
      })
      .catch(err => {
        dispatch(receiveData(stateName));
        callback(err);
      });
  } catch (error) {
    console.log(`effect[${stateName}] is catch error: `, error);
    dispatch(receiveData(stateName));
  }
};

export default {
  requestData,
  receiveData,
};
