import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withReplay from './with-replay';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {renderButton} = props;

  return (
    <div>
      {renderButton()}
    </div>
  );
};

MockCompoment.propTypes = {
  renderButton: PropTypes.func.isRequired
};

describe(`Component return by withReplay function`, () => {
  it(`updates state correctly`, () => {
    const history = {
      push: jest.fn()
    };
    const onReplay = jest.fn();

    const MockComponentWrapped = withReplay(MockCompoment);
    const wrapper = mount(
        <MockComponentWrapped history={history} onReplay={onReplay} />
    );

    wrapper.find(`button`).simulate(`click`);
    expect(onReplay).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(`/`);
  });
});
