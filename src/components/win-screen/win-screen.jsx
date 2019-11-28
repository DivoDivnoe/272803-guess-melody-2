import React from 'react';
import PropTypes from 'prop-types';
import {parseTime, getTimeEnding} from '../../utils';

const WinScreen = (props) => {
  const {gameTime, mistakes} = props;
  const {minutes, seconds} = parseTime(gameTime);

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        {`За ${minutes} минут${getTimeEnding(minutes)} и ${seconds} секунд{getTimeEnding(seconds)} вы набрали 12 баллов (8 быстрых), совершив ${mistakes} ошибки`}
      </p>
      <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
      <button className="replay" type="button">Сыграть ещё раз</button>
    </section>
  );
};

WinScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired
};

export default WinScreen;
