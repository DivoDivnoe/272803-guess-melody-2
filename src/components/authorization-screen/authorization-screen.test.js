import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen.jsx';

describe(`AuthorizationScreen component`, () => {
  it(`is rendered correctly`, () => {
    const mock = {
      name: ``,
      password: ``,
      onChange: jest.fn(),
      onSubmit: jest.fn()
    };
    const {name, password, onChange, onSubmit} = mock;

    const tree = renderer.create(
        <AuthorizationScreen
          name={name}
          password={password}
          onChange={onChange}
          onSubmit={onSubmit}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

