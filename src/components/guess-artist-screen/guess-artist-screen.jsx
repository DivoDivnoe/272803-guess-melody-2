import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GuessArtistScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {question, onAnswer, screenIndex, renderPlayer} = this.props;
    const {answers, song} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          {[song].map((item, index) => (
            <div className="track" key={`track-${screenIndex}.${index}`}>
              {renderPlayer(item, index)}
            </div>
          ))}
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
    );
  }
}

export default GuessArtistScreen;

GuessArtistScreen.propTypes = {
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
