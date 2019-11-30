import {ActionType, Points} from '../../constants';

const FAST_ANSWER_TIME = 30;

const initialState = {
  mistakes: 0,
  step: -1,
  gameTime: 0,
  lastAnswerTime: 0,
  points: 0
};

Object.freeze(initialState);

const ActionCreator = {
  incrementStep: () => {
    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    };
  },
  incrementMistakes: (userAnswer, question, gameTime, lastAnswerTime) => {
    let result;

    switch (question.type) {
      case `artist`:
        result = isRightArtist(userAnswer, question);
        break;
      case `genre`:
        result = isRightGenre(userAnswer, question);
        break;
    }

    if (result) {
      return ActionCreator.addPoints(gameTime, lastAnswerTime);
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
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
  },
  setLastAnswerTime: () => {
    return {
      type: ActionType.SET_LAST_ANSWER_TIME
    };
  },
  addPoints: (gameTime, lastAnswerTime) => {
    const answerTime = gameTime - lastAnswerTime;
    const points = answerTime < FAST_ANSWER_TIME ? Points.FAST_RIGHT_ANSWER : Points.RIGHT_ANSWER;

    return {
      type: ActionType.ADD_POINTS,
      payload: points
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
    case ActionType.ADD_POINTS:
      return Object.assign({}, state, {points: state.points + action.payload});
    case ActionType.SET_LAST_ANSWER_TIME:
      return Object.assign({}, state, {lastAnswerTime: state.gameTime});
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
