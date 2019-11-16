import {
  reducer,
  ActionCreator,
  Operation
} from './data';
import {ActionType} from '../../constants';
import createApi from '../api';
import MockAdapter from 'axios-mock-adapter';

describe(`Action creators work correctly`, () => {
  it(`sets questions correctly`, () => {
    const questions = [{type: `artist`}, {type: `genre`}];
    const action = ActionCreator.loadQuestions(questions);

    expect(action).toEqual({
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    });
  });
});

describe(`reducer returns correct state`, () => {
  it(`with load questions action`, () => {
    const questions = [{type: `artist`}, {type: `genre`}];

    const state = {
      step: 0,
      mistakes: 0,
      gameTime: 0,
      questions: []
    };
    const action = {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    };

    expect(reducer(state, action)).toEqual({
      step: 0,
      mistakes: 0,
      gameTime: 0,
      questions
    });
  });
});

describe(`loadQuestions function`, () => {
  it(`should make a correct call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);

    const questionsLoader = Operation.loadQuestions();

    mockApi
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionsLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}]
        });
      });
  });
});
