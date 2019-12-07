import React from 'react';
import PropTypes from 'prop-types';
import {parseTime, getTimeEnding, getMistakesEnding} from '../../utils';

const WinScreen = (props) => {
  const {gameTime, mistakes, points, fastPoints, renderButton} = props;
  const {minutes, seconds} = parseTime(gameTime);

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        {`За ${minutes} минут${getTimeEnding(minutes)} и ${seconds} секунд${getTimeEnding(seconds)} вы набрали ${points} баллов (${fastPoints} быстрых), совершив ${mistakes} ошиб${getMistakesEnding(mistakes)}`}
      </p>
      <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
      {renderButton()}
    </section>
  );
};

WinScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  fastPoints: PropTypes.number.isRequired,
  renderButton: PropTypes.func.isRequired
};

export default WinScreen;
