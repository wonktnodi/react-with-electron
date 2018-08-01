import * as types from '../actions/types';

const initialState = {
  currentUser: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case types.USER_SAVE_INFO: {
    const { payload } = action;
    const currentUser = {
      name: payload.nickName,
      avatar: payload.headImg,
      userid: payload.userId
    };
    return { ...state, currentUser };
  }

  default:
    return state;
  }
}
