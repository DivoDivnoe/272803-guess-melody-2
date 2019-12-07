import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

jest.mock(`../lifes/lifes.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../timer/timer.jsx`, () => jest.fn().mockReturnValue(null));

describe(`Header component`, () => {
  it(`is rendered correctly`, () => {
    const gameTime = 10;
    const mistakes = 2;
    const onReset = jest.fn();

    const tree = renderer.create(
        <Header
          gameTime={gameTime}
          mistakes={mistakes}
          onReset={onReset}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
