import React from 'react';
import PropTypes from 'prop-types';
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
  const {question, gameTime, mistakes} = props;
  const CurrentScreen = Screen[question.type];

  return (
    <section className={`game game--${question.type}`}>
      <Header gameTime={gameTime} mistakes={mistakes} />

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
  mistakes: PropTypes.number.isRequired
};

export default GameScreen;