import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

jest.mock(`../preloader/preloader.jsx`, () => jest.fn().mockReturnValue(null));

describe(`WelcomeScreen`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      isLoading: false,
      settings: {
        time: 0,
        mistakes: 0,
      },
      onClick: jest.fn()
    };

    const {settings, isLoading, onClick} = mocks;

    const tree = renderer
      .create(
          <WelcomeScreen
            isLoading={isLoading}
            settings={settings}
            onClick={onClick}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
