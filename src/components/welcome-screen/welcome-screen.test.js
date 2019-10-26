import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

describe(`WelcomeScreen`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      settings: {
        time: 0,
        mistakes: 0,
      },
      onClick: jest.fn()
    };

    const {settings, onClick} = mocks;

    const tree = renderer
      .create(
          <WelcomeScreen
            settings={settings}
            onClick={onClick}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
