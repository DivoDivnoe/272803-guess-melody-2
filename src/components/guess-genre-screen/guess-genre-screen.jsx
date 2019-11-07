import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Lifes from '../lifes/lifes.jsx';
import Timer from '../timer/timer.jsx';

class GuessGenreScreen extends PureComponent {
  constructor(props) {
    super(props);

    const answer = Array.from({length: props.question.answers.length}, () => 0);
    this.state = {
      answer,
    };
  }

  render() {
    const {question, onAnswer, screenIndex, mistakes, gameTime, renderPlayer} = this.props;
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
          <form className="game__tracks" onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(this.state.answer);
          }}>
            {answers.map((answer, index) => (
              <div className="track" key={`answer-${screenIndex}.${index}`}>
                {renderPlayer(answer, index)}

                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`} checked={!!this.state.answer[index]} onChange={() => {
                    const checks = this.state.answer.slice();
                    checks[index] = +!checks[index];

                    this.setState({answer: checks});
                  }} />
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
}

GuessGenreScreen.propTypes = {
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
  renderPlayer: PropTypes.func.isRequired
};

export default GuessGenreScreen;
