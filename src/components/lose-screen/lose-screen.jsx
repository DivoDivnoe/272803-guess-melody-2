import React from 'react';
import PropTypes from 'prop-types';
import {LoseType} from '../../constants';

const ScreenText = {
  [LoseType.TIMEOUT]: {
    title: `Увы и ах!`,
    text: `Время вышло! Вы не успели отгадать все мелодии`
  },
  [LoseType.MANY_MISTAKES]: {
    title: `Какая жалость!`,
    text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  }
};

const LoseScreen = (props) => {
  const {type} = props;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">{ScreenText[type].title}</h2>
      <p className="result__total result__total--fail">{ScreenText[type].text}</p>
      <button className="replay" type="button">Попробовать ещё раз</button>
    </section>
  );
};

LoseScreen.propTypes = {
  type: PropTypes.oneOf([`timeout`, `mistakes`])
};

export default LoseScreen;
