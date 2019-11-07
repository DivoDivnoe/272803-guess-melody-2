import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withLoading from './with-loading';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {onLoad} = props;

  return <audio onCanPlayThrough={onLoad} />;
};

MockCompoment.propTypes = {
  onLoad: PropTypes.func.isRequired
};

describe(`Component return by withLoading function`, () => {
  it(`updates state correctly`, () => {
    const Player = withLoading(MockCompoment);
    const player = mount(
        <Player />
    );

    expect(player.state(`isLoading`)).toEqual(true);

    player.find(`audio`).simulate(`canplaythrough`);
    expect(player.state(`isLoading`)).toEqual(false);
  });
});
