import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Lifes from '../lifes/lifes.jsx';
import Timer from '../timer/timer.jsx';

class GuessArtistScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {question, onAnswer, screenIndex, mistakes, gameTime, renderPlayer} = this.props;
    const {answers, song} = question;

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center`}} />
          </svg>

          <Timer gameTime={gameTime} />
          <Lifes mistakes={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              {renderPlayer(song, 0)}
            </div>
          </div>

          <form className="game__artist">
            {answers.map((answer, i) => (
              <div className="artist" key={`answer-${screenIndex}.${i}`}>
                <input className="artist__input visually-hidden" type="radio" name="answer" value="${answer.artist}" id={`answer-${i}`} onChange={() => onAnswer(answer)} />
                <label className="artist__name" htmlFor={`answer-${i}`}>
                  <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                  {answer.artist}
                </label>
              </div>
            ))}
          </form>
        </section>
      </section>
    );
  }
}

export default GuessArtistScreen;

GuessArtistScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  question: PropTypes.exact({
    type: PropTypes.oneOf([`artist`]).isRequired,
    song: PropTypes.exact({
      src: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.exact({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired
};
