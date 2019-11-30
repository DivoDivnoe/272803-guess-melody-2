import React from 'react';
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

const GameScreen = (props) => {
  const {
    questionsAmount,
    question,
    gameTime,
    mistakes,
    settings,
    step,
    onStopTick,
    onReset
  } = props;
  const CurrentScreen = Screen[question.type];

  if (mistakes >= settings.mistakes || !gameTime) {
    onStopTick();
    return <Redirect to="/lose" />;
  } else if (step >= questionsAmount) {
    onStopTick();
    return <Redirect to="/win" />;
  }

  return (
    <section className={`game game--${question.type}`}>
      <Header gameTime={gameTime} mistakes={mistakes} onReset={onReset} />

      <CurrentScreen {...props} />
    </section>
  );
};

GameScreen.propTypes = {
  question: PropTypes.oneOfType([
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
  ]).isRequired,
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questionsAmount: PropTypes.number.isRequired,
  settings: PropTypes.exact({
    time: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired
  }),
  onStopTick: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default GameScreen;
