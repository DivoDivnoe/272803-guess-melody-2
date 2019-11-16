import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import App from './components/app/app.jsx';
import {gameSettings} from './constants';
import reducer from './reducer/index';
import createApi from './api';

const api = createApi((...args) => store.dispatch(...args));

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

const init = () => {
  ReactDOM.render(
      <Provider store={store} >
        <App
          settings={gameSettings}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
