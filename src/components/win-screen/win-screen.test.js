import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from './win-screen.jsx';

describe(`WinScreen component`, () => {
  it(`is rendered correctly`, () => {
    const gameTime = 30;
    const mistakes = 1;

    const tree = renderer.create(
        <WinScreen gameTime={gameTime} mistakes={mistakes} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
