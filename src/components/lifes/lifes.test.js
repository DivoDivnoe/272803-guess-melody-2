import React from 'react';
import renderer from 'react-test-renderer';
import Lifes from './lifes.jsx';

describe(`Lifes component`, () => {
  it(`is rendered correctly`, () => {
    const mistakes = 1;

    const tree = renderer.create(
        <Lifes
          mistakes={mistakes}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
