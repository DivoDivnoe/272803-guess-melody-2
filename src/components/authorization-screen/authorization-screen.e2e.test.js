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
      history: {
        goBack: jest.fn()
      },
      gameTime: 30,
      mistakes: 0,
      points: 18,
      fastPoints: 10,
      onSuccess: jest.fn(),
      renderButton: jest.fn(),
      onChange: jest.fn(),
      onSetUserData: jest.fn(),
      onChangeServerStatus: jest.fn(),
      submitPrevention: jest.fn()
    };
    const {
      name,
      password,
      serverStatus,
      history,
      gameTime,
      mistakes,
      points,
      fastPoints,
      renderButton,
      onChange,
      onSetUserData,
      onSuccess,
      onChangeServerStatus,
      submitPrevention
    } = mock;

    const wrapper = shallow(
        <AuthorizationScreen
          name={name}
          password={password}
          serverStatus={serverStatus}
          history={history}
          gameTime={gameTime}
          mistakes={mistakes}
          points={points}
          fastPoints={fastPoints}
          onSuccess={onSuccess}
          renderButton={renderButton}
          onChange={onChange}
          onSetUserData={onSetUserData}
          onChangeServerStatus={onChangeServerStatus}
        />
    );

    wrapper.find(`form`).simulate(`submit`, {preventDefault: submitPrevention});
    expect(submitPrevention).toHaveBeenCalledTimes(1);
    expect(onSetUserData).toHaveBeenCalledTimes(1);
    expect(onSetUserData).toHaveBeenCalledWith({email: `Andrey`, password: `1234`}, onSuccess, onChangeServerStatus);
  });
});
