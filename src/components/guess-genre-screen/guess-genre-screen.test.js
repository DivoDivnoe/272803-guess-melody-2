import React from 'react';
import renderer from 'react-test-renderer';
import GuessGenreScreen from './guess-genre-screen.jsx';

describe(`GuessGenreScreen component`, () => {
  it(`is rendered correctly`, () => {
    const question = {
      type: `genre`,
      genre: ``,
      answers: [{src: `http://somesrc/`, genre: ``}]
    };
    const screenIndex = 0;

    const tree = renderer.create(
        <GuessGenreScreen
          question={question}
          screenIndex={screenIndex}
          onSubmit={jest.fn()}
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

