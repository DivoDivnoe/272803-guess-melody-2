import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from './win-screen.jsx';

describe(`WinScreen component`, () => {
  it(`is rendered correctly`, () => {

    const tree = renderer.create(
        <WinScreen />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
