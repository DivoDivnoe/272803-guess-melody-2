import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome';

Enzyme.configure({adapter: new Adapter()});

describe(`WelcomeScreen component`, () => {
  it(`reacts to clicking the button correctly`, () => {
    const mocks = {time: 0, mistakes: 0, onClick: jest.fn()};
    const {time, mistakes, onClick} = mocks;

    const welcomeScreen = shallow(
        <WelcomeScreen
          time={time}
          mistakes={mistakes}
          onClick={onClick}
        />
    );

    const button = welcomeScreen.find(`button`);
    button.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
