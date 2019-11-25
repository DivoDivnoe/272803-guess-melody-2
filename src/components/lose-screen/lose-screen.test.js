import React from 'react';
import renderer from 'react-test-renderer';
import LoseScreen from './lose-screen.jsx';

describe(`LoseScreen component`, () => {
  it(`is rendered correctly`, () => {

    const tree = renderer.create(
        <LoseScreen />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
