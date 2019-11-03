import React from 'react';
import renderer from 'react-test-renderer';
import GuessGenreScreen from './guess-genre-screen.jsx';

jest.mock(`../player/player.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../lifes/lifes.jsx`, () => jest.fn().mockReturnValue(null));

describe(`GuessGenreScreen component`, () => {
  it(`is rendered correctly`, () => {
    const question = {
      type: `genre`,
      genre: ``,
      answers: [{src: `http://somesrc/`, genre: ``}]
    };
    const screenIndex = 0;
    const mistakes = 1;

    const tree = renderer.create(
        <GuessGenreScreen
          question={question}
          screenIndex={screenIndex}
          mistakes={mistakes}
          onAnswer={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

