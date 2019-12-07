import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import GuessGenreScreen from '../guess-genre-screen/guess-genre-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import Header from '../header/header.jsx';

import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withAnswers from '../../hocs/with-answers/with-answers';

const GenreScreenWrapped = withAnswers(withActivePlayer(GuessGenreScreen));
const ArtistScreeWrapped = withActivePlayer(GuessArtistScreen);

import {GameType} from '../../constants';

const Screen = {
  [GameType.ARTIST]: ArtistScreeWrapped,
  [GameType.GENRE]: GenreScreenWrapped
};

const TIME_INTERVAL = 1000;

class GameScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.tickId = null;
  }

  componentDidMount() {
    this.props.onTick();
  }

  componentDidUpdate(prevProps) {
    const {gameTime} = this.props;

    if (prevProps.gameTime !== gameTime) {
      this._handleTick();
    }
  }

  componentWillUnmount() {
    if (!this.tickId) {
      return false;
    }

    clearTimeout(this.tickId);
    this.tickId = null;

    return true;
  }

  _handleTick() {
    const {onTick} = this.props;

    this.tickId = setTimeout(() => onTick(), TIME_INTERVAL);
  }

  render() {
    const {
      questionsAmount,
      gameTime,
      mistakes,
      settings,
      questions,
      step,
      onReset
    } = this.props;

    const question = questions[step];


    if (mistakes >= settings.mistakes || !gameTime) {
      return <Redirect to="/lose" />;
    } else if (step >= questionsAmount) {
      return <Redirect to="/win" />;
    }

    const CurrentScreen = Screen[question.type];

    return (
      <section className={`game game--${question.type}`}>
        <Header gameTime={gameTime} mistakes={mistakes} onReset={onReset} />

        <CurrentScreen {...this.props} question={question} />
      </section>
    );
  }
}


GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.exact({
          type: PropTypes.oneOf([`genre`]).isRequired,
          genre: PropTypes.string.isRequired,
          answers: PropTypes.arrayOf(PropTypes.exact({
            src: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired
          })).isRequired,
        }),
        PropTypes.exact({
          type: PropTypes.oneOf([`artist`]).isRequired,
          song: PropTypes.exact({
            src: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired
          }).isRequired,
          answers: PropTypes.arrayOf(PropTypes.exact({
            picture: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired
          })).isRequired,
        })
      ])
  ).isRequired,
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questionsAmount: PropTypes.number.isRequired,
  settings: PropTypes.exact({
    time: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired
  }),
  onReset: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired
};

export default GameScreen;
