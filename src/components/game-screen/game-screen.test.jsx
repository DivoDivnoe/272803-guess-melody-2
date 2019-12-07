import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import GameScreen from './game-screen.jsx';

jest.mock(`../guess-artist-screen/guess-artist-screen.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../guess-genre-screen/guess-genre-screen.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));

describe(`GameScreen component`, () => {
  it(`is rendered correctly`, () => {
    const questions = [
      {
        type: `artist`,
        song: {artist: ``, src: ``},
        answers: [{picture: `http://somesrc/`, artist: ``}]
      }
    ];
    const settings = {
      time: 30,
      mistakes: 2
    };
    const mistakes = 1;
    const gameTime = 0;
    const screenIndex = 0;
    const step = 2;
    const questionsAmount = 10;
    const onReset = jest.fn();
    const onTick = jest.fn();

    const tree = renderer.create(
        <BrowserRouter>
          <GameScreen
            questions={questions}
            mistakes={mistakes}
            gameTime={gameTime}
            screenIndex={screenIndex}
            settings={settings}
            step={step}
            questionsAmount={questionsAmount}
            onReset={onReset}
            onTick={onTick}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

