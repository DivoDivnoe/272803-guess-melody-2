import {ActionType, StatusCode} from '../../constants';

const initialState = {
  user: {}
};

Object.freeze(initialState);

const Operation = {
  getUserData: () => (dispatch, _, api) => {
    return api.get(`/login`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(ActionCreator.setUserData(response.data));
      }
    })
    .catch((error) => {
      if (error.response.status === StatusCode.FORBIDDEN) {
        dispatch(ActionCreator.setUserData({}));
      }
    });
  },
  setUserData: (data, onSuccess, onFail) => (dispatch, __, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setUserData(response.data));
          onSuccess();
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
  setUserData: (data) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: data
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
