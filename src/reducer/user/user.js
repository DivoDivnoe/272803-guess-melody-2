import {ActionType} from '../../constants';

const initialState = {
  isAuthorizationRequired: false,
};

Object.freeze(initialState);

const Operation = {
  authUser: () => (_, __, api) => {
    return api.get(`/login`);
  }
};

const ActionCreator = {
  authUser: (status) => {
    return {
      type: ActionType.AUTH_USER,
      payload: status
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
  }

  return state;
};

export {
  Operation,
  ActionCreator,
  reducer
};
