import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GuessGenreScreen extends PureComponent {
  constructor(props) {
    super(props);

    const checks = Array.from({length: props.question.answers.length}, () => 0);
    this.state = {checks};
  }

  render() {
    const {question, onSubmit, screenIndex} = this.props;
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

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите инди-рок треки</h2>
          <form className="game__tracks" onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit();
          }}>
            {answers.map((answer, index) => (
              <div className="track" key={`answer-${screenIndex}.${index}`}>
                <button className="track__button track__button--play" type="button"></button>
                <div className="track__status">
                  <audio src={answer.src}></audio>
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`} checked={!!this.state.checks[index]} onChange={() => {
                    const checks = this.state.checks.slice();
                    checks[index] = +!checks[index];

                    this.setState({checks});
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
  question: PropTypes.exact({
    type: PropTypes.oneOf([`genre`]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.exact({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired,
  screenIndex: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default GuessGenreScreen;
