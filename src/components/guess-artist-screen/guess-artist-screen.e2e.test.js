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
    const mistakes = 1;
    const gameTime = 0;
    const onAnswer = jest.fn();

    const guessArtistScreen = shallow(
        <GuessArtistScreen
          question={question}
          screenIndex={screenIndex}
          mistakes={mistakes}
          gameTime={gameTime}
          onAnswer={onAnswer}
        />
    );

    const input = guessArtistScreen.find(`input`).first();
    input.simulate(`change`);

    expect(onAnswer).toHaveBeenCalledTimes(1);
  });
});
