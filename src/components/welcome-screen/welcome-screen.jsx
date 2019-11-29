import React from 'react';
import PropTypes from 'prop-types';
import Preloader from '../preloader/preloader.jsx';

const SECONDS_PER_MINUTE = 60;

const WelcomeScreen = (props) => {
  const {settings, isLoading, onClick} = props;
  const {time, mistakes} = settings;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      {!isLoading ?
        (
          <button className="welcome__button" onClick={onClick}>
            <span className="visually-hidden">Начать игру</span>
          </button>
        ) :
        (<Preloader />)
      }
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>За {time / SECONDS_PER_MINUTE} минут нужно ответить на все вопросы.</li>
        <li>Можно допустить {mistakes} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

WelcomeScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.exact({
    time: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func.isRequired
};

export default WelcomeScreen;
