import {
  reducer,
  ActionCreator,
} from './game';
import {ActionType} from '../../constants';

describe(`Action creators work correctly`, () => {
  it(`for incrementing step if it is not final`, () => {
    const step = 8;
    const steps = 10;
    const action = ActionCreator.incrementStep(step, steps);

    expect(action).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1
    });
  });

  it(`resets state if it is final step`, () => {
    const step = 9;
    const steps = 10;
    const action = ActionCreator.incrementStep(step, steps);

    expect(action).toEqual({type: ActionType.RESET});
  });

  it(`for incrementing mistakes if the answer is right and question type is "Artist"`, () => {
    const userAnswer = {artist: `Ariya`};
    const question = {
      type: `artist`,
      song: {artist: `Ariya`}
    };
    const mistakes = 0;
    const maxMistakes = 3;
    const action = ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes);

    expect(action).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    });
  });

  it(`for incrementing mistakes if the answer is right and question type is "Genre"`, () => {
    const userAnswer = [0, 0, 1, 0];
    const question = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `../audio/Baskov-Sharmanka.mp3`,
          genre: `pop`,
        },
        {
          src: `../audio/Tisto-In_The_Dark.mp3`,
          genre: `electronic`,
        },
        {
          src: `../audio/Radiohead-Creep.mp3`,
          genre: `rock`,
        },
        {
          src: `../audio/Chaif-Arg-Jam.mp3`,
          genre: `reggae`,
        },
      ],
    };
    const mistakes = 0;
    const maxMistakes = 3;
    const action = ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes);

    expect(action).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    });
  });

  it(`for incrementing mistakes if the answer is wrong and question type is "Artist"`, () => {
    const userAnswer = {artist: `Ariya`};
    const question = {
      type: `artist`,
      song: {artist: `Pink Floyd`}
    };
    const mistakes = 0;
    const maxMistakes = 3;
    const action = ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes);

    expect(action).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    });
  });

  it(`for incrementing mistakes if the answer is wrong and question type is "Genre"`, () => {
    const userAnswer = [1, 1, 1, 1];
    const question = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `../audio/Baskov-Sharmanka.mp3`,
          genre: `pop`,
        },
        {
          src: `../audio/Tisto-In_The_Dark.mp3`,
          genre: `electronic`,
        },
        {
          src: `../audio/Radiohead-Creep.mp3`,
          genre: `rock`,
        },
        {
          src: `../audio/Chaif-Arg-Jam.mp3`,
          genre: `reggae`,
        },
      ],
    };
    const mistakes = 0;
    const maxMistakes = 3;
    const action = ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes);

    expect(action).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    });
  });

  it(`resets state if the answer is wrong, question type is "Artist" and too many mistakes`, () => {
    const userAnswer = {artist: `Ariya`};
    const question = {
      type: `artist`,
      song: {artist: `Pink Floyd`}
    };
    const mistakes = 2;
    const maxMistakes = 3;
    const action = ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes);

    expect(action).toEqual({type: ActionType.RESET});
  });

  it(`resets state if the answer is wrong, question type is "Genre" and no mistakes left`, () => {
    const userAnswer = [1, 1, 1, 1];
    const question = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `../audio/Baskov-Sharmanka.mp3`,
          genre: `pop`,
        },
        {
          src: `../audio/Tisto-In_The_Dark.mp3`,
          genre: `electronic`,
        },
        {
          src: `../audio/Radiohead-Creep.mp3`,
          genre: `rock`,
        },
        {
          src: `../audio/Chaif-Arg-Jam.mp3`,
          genre: `reggae`,
        },
      ],
    };
    const mistakes = 2;
    const maxMistakes = 3;
    const action = ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes);

    expect(action).toEqual({type: ActionType.RESET});
  });

  it(`increments time correctly if the time is not over`, () => {
    const curTime = 29;
    const maxTime = 30;
    const action = ActionCreator.incrementTime(curTime, maxTime);

    expect(action).toEqual({type: ActionType.RESET});
  });
});

describe(`reducer returns correct state`, () => {
  it(`without additional parameters`, () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 0,
    });
  });

  it(`with incrementing step action`, () => {
    const state = {
      step: 0,
      mistakes: 0,
      gameTime: 0,
    };

    const action = {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    };

    expect(reducer(state, action)).toEqual({
      step: 1,
      mistakes: 0,
      gameTime: 0,
    });
  });

  it(`with incrementing mistakes action, payload 1`, () => {
    const state = {
      step: 0,
      mistakes: 0,
      gameTime: 0,
    };

    const action = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    };

    expect(reducer(state, action)).toEqual({
      step: 0,
      mistakes: 1,
      gameTime: 0,
    });
  });

  it(`with incrementing mistakes action, payload 0`, () => {
    const state = {
      step: 0,
      mistakes: 0,
      gameTime: 0,
    };

    const action = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    };

    expect(reducer(state, action)).toEqual({
      step: 0,
      mistakes: 0,
      gameTime: 0,
    });
  });

  it(`with reset state action`, () => {
    const state = {
      step: 0,
      mistakes: 2,
      gameTime: 10,
    };

    const action = {type: ActionType.RESET};

    expect(reducer(state, action)).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 0,
    });
  });
});
