import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome.jsx';

describe(`WelcomeScreen`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      time: 0,
      mistakes: 0,
      onClick: jest.fn()
    };

    const {time, mistakes, onClick} = mocks;

    const tree = renderer
      .create(
          <WelcomeScreen
            time={time}
            mistakes={mistakes}
            onClick={onClick}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
