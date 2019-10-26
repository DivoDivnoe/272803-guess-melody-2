import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessArtistScreen from './guess-artist-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`GuessArtistScreen component`, () => {
  it(`reacts correctly to changing input radio value`, () => {
    const question = {
      type: `artist`,
      song: {artist: ``, src: ``},
      answers: [{picture: `http://somesrc/`, artist: ``}]
    };
    const screenIndex = 0;
    const onClick = jest.fn();

    const guessArtistScreen = shallow(
        <GuessArtistScreen
          question={question}
          screenIndex={screenIndex}
          onClick={onClick}
        />
    );

    const input = guessArtistScreen.find(`input`).first();
    input.simulate(`change`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
