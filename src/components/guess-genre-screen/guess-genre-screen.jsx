import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

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
      renderPlayer,
      onClick
    } = this.props;
    const {answers} = question;

    return (
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
