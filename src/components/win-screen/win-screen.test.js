import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from './win-screen.jsx';

describe(`WinScreen component`, () => {
  it(`is rendered correctly`, () => {
    const gameTime = 30;
    const mistakes = 1;
    const points = 10;
    const fastPoints = 8;
    const renderButton = jest.fn();

    const tree = renderer.create(
        <WinScreen
          gameTime={gameTime}
          mistakes={mistakes}
          points={points}
          fastPoints={fastPoints}
          renderButton={renderButton}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
