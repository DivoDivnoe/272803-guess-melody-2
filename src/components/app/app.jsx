import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessGenreScreen from '../guess-genre-screen/guess-genre-screen.jsx';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/reducer.js';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withAnswers from '../../hocs/with-answers/with-answers';

const GenreScreenWrapped = withAnswers(withActivePlayer(GuessGenreScreen));
const ArtistScreeWrapped = withActivePlayer(GuessArtistScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.tickId = null;

    this.handleTick = this.handleTick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {gameTime} = this.props;

    if (this.props.step < 0) {
      this.stopTick();
    } else if (gameTime && prevProps.gameTime !== gameTime) {
      this.handleTick();
    }
  }

  handleTick() {
    const {settings, gameTime, onTick} = this.props;

    this.tickId = setTimeout(() => onTick(gameTime, settings.time), 1000);
  }

  stopTick() {
    if (!this.tickId) {
      return false;
    }

    clearTimeout(this.tickId);
    this.tickId = null;

    return true;
  }

  handleAnswer(userAnswer) {
    const {
      questions,
      mistakes,
      settings,
      step,
      onUserAnswer
    } = this.props;

    const question = questions[step];

    onUserAnswer(userAnswer, question, mistakes, settings.maxMistakes, step, questions.length);
  }

  _getScreen() {
    const {
      questions,
      mistakes,
      settings,
      step,
      gameTime,
      onWelcomeScreenClick
    } = this.props;

    if (step < 0) {
      return (
        <WelcomeScreen
          settings={settings}
          onClick={onWelcomeScreenClick}
          onTick={this.handleTick}
        />
      );
    }

    const question = questions[step];
    const timeLeft = settings.time - gameTime;

    switch (question.type) {
      case `artist`:
        return <ArtistScreeWrapped
          question={question}
          screenIndex={step}
          mistakes={mistakes}
          gameTime={timeLeft}
          onAnswer={this.handleAnswer}
        />;
      case `genre`:
        return <GenreScreenWrapped
          question={question}
          screenIndex={step}
          mistakes={mistakes}
          gameTime={timeLeft}
          onAnswer={this.handleAnswer}
        />;
    }

    return null;
  }

  render() {
    return this._getScreen();
  }
}

App.propTypes = {
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
  settings: PropTypes.exact({
    time: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired
  }),
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: state.mistakes,
  step: state.step,
  gameTime: state.gameTime
});
const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),
  onTick: (curTime, gameTime) => dispatch(ActionCreator.incrementTime(curTime, gameTime)),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, step, steps) => {
    dispatch(ActionCreator.incrementStep(step, steps));
    dispatch(ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
