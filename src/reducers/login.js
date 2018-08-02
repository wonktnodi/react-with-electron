import * as types from '../actions/types';
import { setAuthority } from '../utils/authority';

const initialState = {
  status: undefined,
};

export default function login(state = initialState, action) {
  switch (action.type) {
  case types.USER_CHANGE_LOGIN_STATUS:
    setAuthority(action.payload.currentAuthority);
    return { ...state, status: action.payload.status };
  case types.USER_LOGIN: {
    const { payload } = action;
    if (payload.error) {
      return {
        ...state,
        status: 401,
        type: payload.data.type,
      };
    }

    return {
      ...state,
      status: 200,
      type: payload.data.type,
    };
  }
  default:
    return state;
  }
}
