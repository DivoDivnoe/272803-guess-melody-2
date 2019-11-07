import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Lifes from '../lifes/lifes.jsx';
import Timer from '../timer/timer.jsx';

class GuessGenreScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {
      question,
      answer,
      screenIndex,
      mistakes,
      gameTime,
      renderPlayer,
      onClick
    } = this.props;
    const {answers} = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center`}} />
          </svg>

          <Timer gameTime={gameTime} />
          <Lifes mistakes={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {question.genre} треки</h2>
          <form className="game__tracks" onSubmit={this.handleSubmit}>
            {answers.map((item, index) => (
              <div className="track" key={`answer-${screenIndex}.${index}`}>
                {renderPlayer(item, index)}

                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    checked={!!answer[index]}
                    onChange={() => onClick(index)} />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            ))}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }

  handleSubmit(evt) {
    const {answer, onAnswer} = this.props;

    evt.preventDefault();
    onAnswer(answer);
  }
}

GuessGenreScreen.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.number).isRequired,
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  question: PropTypes.exact({
    type: PropTypes.oneOf([`genre`]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.exact({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default GuessGenreScreen;
