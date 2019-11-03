import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {questions, gameSettings} from './mocks/questions';
import {reducer} from './reducer/reducer';

const store = createStore(reducer);

const init = () => {
  ReactDOM.render(
      <Provider store={store} >
        <App
          settings={gameSettings}
          questions={questions}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
