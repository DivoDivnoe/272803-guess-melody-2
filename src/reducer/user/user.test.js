import {
  reducer,
  ActionCreator,
  Operation
} from './user';
import {ActionType} from '../../constants';
import createApi from '../../api';
import MockAdapter from 'axios-mock-adapter';

describe(`Action creators work correctly`, () => {
  it(`changes user data correctly`, () => {
    const action = ActionCreator.setUserData({
      id: 1,
      name: `Andrey`
    });

    expect(action).toEqual({
      type: ActionType.SET_USER_DATA,
      payload: ({
        id: 1,
        name: `Andrey`
      })
    });
  });
});

describe(`reducer returns correct state`, () => {
  it(`with set user data action`, () => {
    const state = {
      user: {}
    };
    const action = {
      type: ActionType.SET_USER_DATA,
      payload: {
        id: 1,
        name: `Andrey`
      }
    };

    expect(reducer(state, action)).toEqual({
      user: {
        id: 1,
        name: `Andrey`
      }
    });
  });
});

describe(`setUserData function`, () => {
  it(`should make a correct "POST" request to /login`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);
    const data = {};
    const onFail = jest.fn();

    const userAuthenticator = Operation.setUserData(data, onFail);

    mockApi
      .onPost(`/login`)
      .reply(200, {fake: true});

    return userAuthenticator(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_DATA,
          payload: {fake: true}
        });
      });
  });
});
