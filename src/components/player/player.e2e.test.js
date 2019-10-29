import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Player from './player.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Player component`, () => {
  it(`reacts correctly to click event`, () => {
    const mocks = {
      isPlaying: true,
      src: ``,
      onClick: jest.fn()
    };

    const {isPlaying, src, onClick} = mocks;

    const player = mount(
        <Player
          isPlaying={isPlaying}
          src={src}
          onClick={onClick}
        />
    );

    const onPlayMock = jest.fn();
    const onPauseMock = jest.fn();

    player.instance()._audioRef.current.pause = onPauseMock;
    player.instance()._audioRef.current.play = onPlayMock;

    player.setState({isLoading: false});

    player.find(`button`).simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onPlayMock).toHaveBeenCalledTimes(1);
  });
});
