import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`WelcomeScreen component`, () => {
  it(`reacts to clicking the button correctly`, () => {
    const mocks = {settings: {time: 0, mistakes: 0}, onClick: jest.fn(), onTick: jest.fn()};
    const {settings, onClick, onTick} = mocks;

    const welcomeScreen = shallow(
        <WelcomeScreen
          settings={settings}
          onClick={onClick}
          onTick={onTick}
        />
    );

    const button = welcomeScreen.find(`button`);
    button.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
