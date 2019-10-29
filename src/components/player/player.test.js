import React from 'react';
import renderer from 'react-test-renderer';
import Player from './player.jsx';

describe(`Player component`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      isPlaying: false,
      src: ``
    };

    const {isPlaying, src} = mocks;

    const tree = renderer.create(
        <Player
          isPlaying={isPlaying}
          src={src}
          onClick={jest.fn()}
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

