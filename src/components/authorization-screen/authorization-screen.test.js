import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

describe(`AuthorizationScreen component`, () => {
  it(`is rendered correctly`, () => {
    const mock = {
      name: ``,
      password: ``,
      onChangeName: jest.fn(),
      onChangePassword: jest.fn(),
      onSubmit: jest.fn()
    };
    const {name, password, onChangeName, onChangePassword, onSubmit} = mock;

    const tree = renderer.create(
        <AuthorizationScreen
          name={name}
          password={password}
          onChangeName={onChangeName}
          onChangePassword={onChangePassword}
          onSubmit={onSubmit}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

