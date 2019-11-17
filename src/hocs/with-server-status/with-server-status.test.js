import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withServerStatus from './with-server-status';
import {StatusCode} from '../../constants';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {serverStatus} = props;

  return (
    <div>
      {serverStatus === StatusCode.FORBIDDEN && <div className="forbidden">Fofbidden</div>}
    </div>
  );
};

MockCompoment.propTypes = {
  serverStatus: PropTypes.number.isRequired
};


describe(`Component return by withServerStatus function`, () => {
  it(`has no container with ".forbidden className by default"`, () => {
    const MockComponentWrapped = withServerStatus(MockCompoment);

    const wrapper = mount(
        <MockComponentWrapped />
    );

    expect(wrapper.find(`.forbidden`).length).toEqual(0);
  });

  it(`has container with ".forbidden className when serverStatus equals to 403"`, () => {
    const MockComponentWrapped = withServerStatus(MockCompoment);

    const wrapper = mount(
        <MockComponentWrapped />
    );

    wrapper.setState({serverStatus: 403});
    expect(wrapper.find(`.forbidden`).length).toEqual(1);
  });
});
