import {ActionType} from '../../constants';

const initialState = {
  questions: []
};

Object.freeze(initialState);

const Operation = {
  loadQuestions: () => (dispatch, _, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};

const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {questions: action.payload});
  }

  return state;
};

export {
  Operation,
  ActionCreator,
  reducer,
};
