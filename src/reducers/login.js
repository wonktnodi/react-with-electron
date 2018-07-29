import * as types from '../actions/types';

const initialState = {
  status: undefined,
};

export default function login(state = initialState, action) {
  switch (action.type) {
  case types.USER_CHANGE_LOGIN_STATUS:
    return {
      ...state,
      status: action.payload.status,
      type: action.payload.type,
    };
  default:
    return state;
  }
}
