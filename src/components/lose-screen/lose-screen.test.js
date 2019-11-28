import React from 'react';
import renderer from 'react-test-renderer';
import LoseScreen from './lose-screen.jsx';

describe(`LoseScreen component`, () => {
  it(`is rendered correctly`, () => {
    const type = `time`;
    const renderButton = jest.fn();

    const tree = renderer.create(
        <LoseScreen type={type} renderButton={renderButton} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
