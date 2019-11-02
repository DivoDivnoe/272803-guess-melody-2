import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';

jest.mock(`../player/player.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../lifes/lifes.jsx`, () => jest.fn().mockReturnValue(null));

describe(`GuessArtistScreen component`, () => {
  it(`is rendered correctly`, () => {
    const question = {
      type: `artist`,
      song: {artist: ``, src: ``},
      answers: [{picture: `http://somesrc/`, artist: ``}]
    };
    const screenIndex = 0;

    const tree = renderer.create(
        <GuessArtistScreen
          question={question}
          screenIndex={screenIndex}
          onClick={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
