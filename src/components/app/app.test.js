import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

jest.mock(`../player/player.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../lifes/lifes.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../timer/timer.jsx`, () => jest.fn().mockReturnValue(null));

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
    const gameTime = 0;
    const onWelcomeScreenClick = jest.fn();
    const onUserAnswer = jest.fn();
    const onTick = jest.fn();

    const tree = renderer.create(
        <App
          questions={questions}
          settings={settings}
          mistakes={mistakes}
          step={step}
          gameTime={gameTime}
          onWelcomeScreenClick={onWelcomeScreenClick}
          onUserAnswer={onUserAnswer}
          onTick={onTick}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

