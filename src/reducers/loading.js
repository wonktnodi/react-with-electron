import * as types from '../actions/types';

const initialState = {
  global: false,
  modles: {},
  effects: {}
};

export default function loading(state = initialState, action) {
  const namespace = action.category ? action.category.split('/')[0] : '';
  switch (action.type) {
  case types.LOADING_SHOW: {
    if (namespace === '') {
      return { ...state, global: true };
    }
    return {
      ...state,
      global: true,
      models: { ...state.models, [namespace]: true },
      effects: { ...state.effects, [action.category]: true },
    };
  }
  case types.LOADING_HIDE: {
    const effects = { ...state.effects, [action.category]: false };
    const models = {
      ...state.models,
      [namespace]: Object.keys(effects).some(actionType => {
          const _namespace = actionType.split('/')[0]; // eslint-disable-line
        if (_namespace !== namespace) return false;
        return effects[action.category];
      }),
    };
    const global = Object.keys(models).some(key => models[key]);
    return {
      ...state,
      global,
      models,
      effects,
    };
  }

  default:
    return state;
  }
}
