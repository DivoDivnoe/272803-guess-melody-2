import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

describe(`WelcomeScreen`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      questions: 1,
      settings: {
        time: 0,
        mistakes: 0,
      },
      onClick: jest.fn(),
      onTick: jest.fn()
    };

    const {settings, questions, onClick, onTick} = mocks;

    const tree = renderer
      .create(
          <WelcomeScreen
            questions={questions}
            settings={settings}
            onClick={onClick}
            onTick={onTick}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
