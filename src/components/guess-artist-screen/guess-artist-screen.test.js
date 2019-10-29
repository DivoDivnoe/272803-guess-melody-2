import React from 'react';
import renderer from 'react-test-renderer';
import GuessArtistScreen from './guess-artist-screen.jsx';

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
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
