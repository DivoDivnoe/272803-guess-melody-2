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
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    const userAuthenticator = Operation.setUserData(data, onSuccess, onFail);

    mockApi
      .onPost(`/login`)
      .reply(200, {fake: true});

    return userAuthenticator(dispatch, null, api)
      .then(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_DATA,
          payload: {fake: true}
        });
      });
  });

  it(`should make a correct "POST" request to /login`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);
    const data = {};
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    const userAuthenticator = Operation.setUserData(data, onSuccess, onFail);

    mockApi
      .onPost(`/login`)
      .reply(400, {fake: true});

    return userAuthenticator(dispatch, null, api)
      .then(() => {
        expect(onFail).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(0);
      });
  });
});

describe(`getUserData function`, () => {
  it(`should make a correct "GET" request to /login`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);


    const userAuthenticator = Operation.getUserData();

    mockApi
      .onGet(`/login`)
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

  it(`should make a correct "GET" request to /login`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);

    const userAuthenticator = Operation.getUserData();

    mockApi
      .onGet(`/login`)
      .reply(403);

    return userAuthenticator(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_USER_DATA,
          payload: {}
        });
      });
  });
});
