import React from 'react';
import PropTypes from 'prop-types';
import {parseTime, addLeadingZero} from '../../utils';

const Timer = (props) => {
  const {gameTime} = props;
  const {minutes, seconds} = parseTime(gameTime);

  return (
    <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{addLeadingZero(minutes)}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{addLeadingZero(seconds)}</span>
    </div>);
};

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired
};

export default Timer;
