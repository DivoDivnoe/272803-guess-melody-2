import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthorizationScreen from './authorization-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`AuthorizationScreen component`, () => {
  it(`handles submit event correctly`, () => {
    const mock = {
      name: `Andrey`,
      password: `1234`,
      serverStatus: 200,
      onChange: jest.fn(),
      onSetUserData: jest.fn(),
      onChangeServerStatus: jest.fn(),
      submitPrevention: jest.fn()
    };
    const {
      name,
      password,
      serverStatus,
      onChange,
      onSetUserData,
      onChangeServerStatus,
      submitPrevention
    } = mock;

    const wrapper = shallow(
        <AuthorizationScreen
          name={name}
          password={password}
          serverStatus={serverStatus}
          onChange={onChange}
          onSetUserData={onSetUserData}
          onChangeServerStatus={onChangeServerStatus}
        />
    );

    wrapper.find(`form`).simulate(`submit`, {preventDefault: submitPrevention});
    expect(submitPrevention).toHaveBeenCalledTimes(1);
    expect(onSetUserData).toHaveBeenCalledTimes(1);
    expect(onSetUserData).toHaveBeenCalledWith({email: `Andrey`, password: `1234`}, onChangeServerStatus);
  });
});
