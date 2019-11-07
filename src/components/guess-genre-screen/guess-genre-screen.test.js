import React from 'react';
import renderer from 'react-test-renderer';
import GuessGenreScreen from './guess-genre-screen.jsx';

jest.mock(`../player/player.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../lifes/lifes.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../timer/timer.jsx`, () => jest.fn().mockReturnValue(null));

describe(`GuessGenreScreen component`, () => {
  it(`is rendered correctly`, () => {
    const question = {
      type: `genre`,
      genre: ``,
      answers: [{src: `http://somesrc/`, genre: ``}]
    };
    const screenIndex = 0;
    const mistakes = 1;
    const gameTime = 0;
    const answer = [0, 0, 0, 0];

    const tree = renderer.create(
        <GuessGenreScreen
          answer={answer}
          question={question}
          screenIndex={screenIndex}
          mistakes={mistakes}
          gameTime={gameTime}
          onAnswer={jest.fn()}
          renderPlayer={jest.fn()}
          onClick={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

