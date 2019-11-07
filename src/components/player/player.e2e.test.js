import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Player from './player.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Player component`, () => {
  it(`reacts correctly to click event`, () => {
    const mocks = {
      isPlaying: false,
      src: ``,
      isLoading: false,
      onClick: jest.fn(),
      onLoad: jest.fn()
    };

    const {isPlaying, src, isLoading, onClick, onLoad} = mocks;

    const player = mount(
        <Player
          isPlaying={isPlaying}
          src={src}
          isLoading={isLoading}
          onClick={onClick}
          onLoad={onLoad}
        />
    );

    const onPlayMock = jest.fn();
    const onPauseMock = jest.fn();

    player.instance()._audioRef.current.pause = onPauseMock;
    player.instance()._audioRef.current.play = onPlayMock;

    player.find(`button`).simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
