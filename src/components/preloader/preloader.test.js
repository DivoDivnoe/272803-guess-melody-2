import React from 'react';
import renderer from 'react-test-renderer';
import Preloader from './preloader.jsx';

describe(`Preloader component`, () => {
  it(`is rendered correctly`, () => {
    const tree = renderer.create(<Preloader />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
