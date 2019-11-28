import {ActionType} from '../../constants';

const initialState = {
  mistakes: 0,
  step: -1,
  gameTime: 0
};

Object.freeze(initialState);

const ActionCreator = {
  incrementStep: () => {
    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    };
  },
  incrementMistakes: (userAnswer, question) => {
    let result;

    switch (question.type) {
      case `artist`:
        result = isRightArtist(userAnswer, question);
        break;
      case `genre`:
        result = isRightGenre(userAnswer, question);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: +!result
    };
  },
  reset: () => {
    return {
      type: ActionType.RESET
    };
  },
  replay: () => {
    return {
      type: ActionType.REPLAY
    };
  },
  incrementTime: () => {
    return {
      type: ActionType.INCREMENT_TIME,
      payload: 1
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {step: state.step + action.payload});
    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {mistakes: state.mistakes + action.payload});
    case ActionType.RESET:
      return Object.assign({}, initialState);
    case ActionType.REPLAY:
      return Object.assign({}, initialState, {step: 0});
    case ActionType.INCREMENT_TIME:
      return Object.assign({}, state, {gameTime: state.gameTime + action.payload});
  }

  return state;
};

const isRightArtist = (answer, question) => {
  return answer.artist === question.song.artist;
};

const isRightGenre = (answers, question) => {
  return answers.every((answer, index) => answer === +(question.answers[index].genre === question.genre));
};

export {
  ActionCreator,
  isRightArtist,
  isRightGenre,
  reducer
};
