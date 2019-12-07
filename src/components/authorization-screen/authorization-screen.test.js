import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

describe(`AuthorizationScreen component`, () => {
  it(`is rendered correctly`, () => {
    const mock = {
      name: ``,
      password: ``,
      serverStatus: 200,
      history: {
        goBack: jest.fn()
      },
      gameTime: 30,
      mistakes: 0,
      points: 18,
      fastPoints: 10,
      onSuccess: jest.fn(),
      renderButton: jest.fn(),
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onChangeServerStatus: jest.fn()
    };
    const {
      name,
      password,
      serverStatus,
      gameTime,
      mistakes,
      points,
      fastPoints,
      onSuccess,
      renderButton,
      onChange,
      onSubmit,
      onChangeServerStatus
    } = mock;

    const tree = renderer.create(
        <AuthorizationScreen
          name={name}
          password={password}
          serverStatus={serverStatus}
          history={history}
          gameTime={gameTime}
          mistakes={mistakes}
          points={points}
          fastPoints={fastPoints}
          onSuccess={onSuccess}
          renderButton={renderButton}
          onChange={onChange}
          onSetUserData={onSubmit}
          onChangeServerStatus={onChangeServerStatus}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

