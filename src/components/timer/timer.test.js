import React from 'react';
import renderer from 'react-test-renderer';
import Timer from './timer.jsx';

describe(`Timer component`, () => {
  it(`is rendered correctly`, () => {
    const gameTime = 0;

    const tree = renderer.create(
        <Timer
          gameTime={gameTime}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

