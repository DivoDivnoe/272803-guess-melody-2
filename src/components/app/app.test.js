import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

jest.mock(`../player/player.jsx`, () => jest.fn().mockReturnValue(null));

describe(`App component`, () => {
  it(`is rendered correctly`, () => {
    const settings = {
      time: 0,
      mistakes: 0
    };
    const questions = [
      {
        type: `genre`,
        genre: ``,
        answers: [{src: `http://somesrc/`, genre: ``}]
      }
    ];
    const mistakes = 1;
    const step = 0;
    const onWelcomeScreenClick = jest.fn();
    const onUserAnswer = jest.fn();

    const tree = renderer.create(
        <App
          questions={questions}
          settings={settings}
          mistakes={mistakes}
          step={step}
          onWelcomeScreenClick={onWelcomeScreenClick}
          onUserAnswer={onUserAnswer}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

