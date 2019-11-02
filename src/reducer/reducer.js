const initialState = {
  mistakes: 0,
  step: -1,
};

Object.freeze(initialState);

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  RESET: `RESET`
};

const ActionCreator = {
  incrementStep: (step, steps) => {
    if (step + 1 >= steps) {
      return {type: ActionType.RESET};
    }

    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    };
  },
  incrementMistakes: (userAnswer, question, mistakes, maxMistakes) => {
    let result;

    switch (question.type) {
      case `artist`:
        result = isRightArtist(userAnswer, question);
        break;
      case `genre`:
        result = isRightGenre(userAnswer, question);
        break;
    }

    if (!result && mistakes + 1 >= maxMistakes) {
      return {type: ActionType.RESET};
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {step: state.step + action.payload});
    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {mistakes: state.mistakes + action.payload});
    case ActionType.RESET:
      return Object.assign({}, initialState);
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
  reducer,
  ActionCreator,
  isRightArtist,
  isRightGenre
};
