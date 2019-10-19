import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeScreen from './components/welcome/welcome.jsx';

const settings = {
  gameTime: 5,
  mistakes: 3
};

const init = () => {
  ReactDOM.render(
      <WelcomeScreen
        time={settings.gameTime}
        mistakes={settings.mistakes}
        onClick={() => {}}
      />,
      document.querySelector(`#root`)
  );
};

init();
