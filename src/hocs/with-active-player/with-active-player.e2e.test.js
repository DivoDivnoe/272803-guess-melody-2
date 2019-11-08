import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withActivePlayer from './with-active-player';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {renderPlayer} = props;
  const index = 0;
  const src = ``;

  return (
    <div>
      {renderPlayer({src}, index)}
    </div>
  );
};

MockCompoment.propTypes = {
  renderPlayer: PropTypes.func.isRequired
};


describe(`Component return by withActivePlayer function`, () => {
  it(`first track is played by default`, () => {
    const MockComponentWrapped = withActivePlayer(MockCompoment);
    const screenIndex = 0;

    const wrapper = mount(
        <MockComponentWrapped screenIndex={screenIndex} />
    );

    expect(wrapper.state(`activePlayer`)).toEqual(0);
    expect(wrapper.find(`button`).hasClass(`track__button--pause`)).toEqual(true);
  });
});
