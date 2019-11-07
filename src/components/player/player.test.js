import React from 'react';
import renderer from 'react-test-renderer';
import Player from './player.jsx';

describe(`Player component`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      isPlaying: false,
      src: ``,
      isLoading: false,
      onLoad: jest.fn(),
      onClick: jest.fn()
    };

    const {isPlaying, src, isLoading, onLoad, onClick} = mocks;

    const tree = renderer.create(
        <Player
          isPlaying={isPlaying}
          src={src}
          isLoading={isLoading}
          onClick={onClick}
          onLoad={onLoad}
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

