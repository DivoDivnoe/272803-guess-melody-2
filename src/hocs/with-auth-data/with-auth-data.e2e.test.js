import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withAuthData from './with-auth-data';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {name, password, onChange} = props;

  const handleChange = (evt) => {
    const {target} = evt;
    const {name: fieldName, value} = target;

    onChange(fieldName, value);
  };

  return (
    <form>
      <input value={name} onChange={handleChange} />
      <input value={password} onChange={handleChange} />
    </form>
  );
};

MockCompoment.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};


describe(`Component return by withAuthData function`, () => {
  it(`has empty fields by default`, () => {
    const MockComponentWrapped = withAuthData(MockCompoment);
    const history = {
      goBack: jest.fn()
    };

    const wrapper = mount(
        <MockComponentWrapped history={history} />
    );

    expect(wrapper.find(`input`).at(0).props().value).toEqual(``);
    expect(wrapper.find(`input`).at(1).props().value).toEqual(``);
  });

  it(`changes state correctly`, () => {
    const MockComponentWrapped = withAuthData(MockCompoment);
    const history = {
      goBack: jest.fn()
    };

    const wrapper = mount(
        <MockComponentWrapped history={history} />
    );

    wrapper.find(`input`).first().simulate(`change`, {
      target: {
        name: `name`,
        value: `some name`
      }
    });
    expect(wrapper.state().name).toEqual(`some name`);
  });
});
