import {ActionType, StatusCode} from '../../constants';

const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

Object.freeze(initialState);

const Operation = {
  authUser: () => (dispatch, __, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setUserData(response.data));
        }
      });
  },
  setUserData: (data, onFail) => (dispatch, __, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.authUser(false));
          dispatch(ActionCreator.setUserData(response.data));
        }
      })
      .catch((error) => {
        if (error.response.status === StatusCode.BAD_REQUEST) {
          onFail(error.response.status);
        }
      });
  }
};

const ActionCreator = {
  authUser: (status) => {
    return {
      type: ActionType.AUTH_USER,
      payload: status
    };
  },
  setUserData: (data) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: data
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload
      });
  }

  return state;
};

export {
  Operation,
  ActionCreator,
  reducer
};
