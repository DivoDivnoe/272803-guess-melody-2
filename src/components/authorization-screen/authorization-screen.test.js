import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

describe(`AuthorizationScreen component`, () => {
  it(`is rendered correctly`, () => {
    const mock = {
      name: ``,
      password: ``,
      serverStatus: 200,
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onChangeServerStatus: jest.fn()
    };
    const {name, password, serverStatus, onChange, onSubmit, onChangeServerStatus} = mock;

    const tree = renderer.create(
        <AuthorizationScreen
          name={name}
          password={password}
          serverStatus={serverStatus}
          onChange={onChange}
          onSetUserData={onSubmit}
          onChangeServerStatus={onChangeServerStatus}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

