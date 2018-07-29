import * as types from '../actions/types';

export default function global(state = {}, action) {
  switch (action.type) {
  case types.GLOBAL_CHANGE_LAYOUT_COLLAPSED:
    return {
      ...state,
      collapsed: action.payload,
    };
  default:
    return state;
  }
}
