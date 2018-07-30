import * as types from '../actions/types';

const initialState = {
  global: false,
  modles: {},
};

export default function loading(state = initialState, action) {
  const namespace = action.type.split('/')[0];
  switch (action.type) {
  case types.LOADING_SHOW:
    return {
      ...state,
      global: true,
      models: { ...state.models, [namespace]: true },
      effects: { ...state.effects, [action.type]: true },
    };
  case types.LOADING_HIDE: {
    const effects = { ...state.effects, [action.type]: false };
    const models = {
      ...state.models,
      [namespace]: Object.keys(effects).some(actionType => {
          const _namespace = actionType.split('/')[0]; // eslint-disable-line
        if (_namespace !== namespace) return false;
        return effects[action.type];
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
