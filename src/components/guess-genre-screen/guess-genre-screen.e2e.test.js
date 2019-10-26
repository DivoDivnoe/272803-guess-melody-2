import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GuessGenreScreen from './guess-genre-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`GuessGenreScreen component`, () => {
  it(`reacts correctly to submit form event`, () => {
    const question = {
      type: `genre`,
      genre: ``,
      answers: [{src: `http://somesrc/`, genre: ``}]
    };
    const screenIndex = 0;
    const onSubmit = jest.fn();
    const submitPrevention = jest.fn();

    const guessArtistScreen = shallow(
        <GuessGenreScreen
          question={question}
          screenIndex={screenIndex}
          onSubmit={onSubmit}
        />
    );


    const form = guessArtistScreen.find(`form`);
    form.simulate(`submit`, {preventDefault: submitPrevention});

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(submitPrevention).toHaveBeenCalledTimes(1);
  });
});
