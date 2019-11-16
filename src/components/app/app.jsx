import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';

import {Operation} from '../../reducer/data/data';
import {getQuestions} from '../../reducer/data/selectors';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes, getGameTime} from '../../reducer/game/selectors';


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.tickId = null;

    this.handleTick = this.handleTick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    this.props.onLoadQuestions();
  }

  componentDidUpdate(prevProps) {
    const {gameTime} = this.props;

    if (this.props.step < 0) {
      this.stopTick();

      if (prevProps.step >= 0) {
        this.props.onLoadQuestions();
      }
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

    onUserAnswer(userAnswer, question, mistakes, settings.mistakes, step, questions.length);
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
          questions={questions.length}
          settings={settings}
          onClick={onWelcomeScreenClick}
          onTick={this.handleTick}
        />
      );
    }

    const question = questions[step];
    const timeLeft = settings.time - gameTime;

    return (
      <GameScreen
        question={question}
        screenIndex={step}
        mistakes={mistakes}
        gameTime={timeLeft}
        onAnswer={this.handleAnswer}
      />
    );
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
  onTick: PropTypes.func.isRequired,
  onLoadQuestions: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: getMistakes(state),
  step: getStep(state),
  gameTime: getGameTime(state),
  questions: getQuestions(state)
});
const mapDispatchToProps = (dispatch) => ({
  onLoadQuestions: () => dispatch(Operation.loadQuestions()),
  onWelcomeScreenClick: () => dispatch(GameActionCreator.incrementStep()),
  onTick: (curTime, gameTime) => dispatch(GameActionCreator.incrementTime(curTime, gameTime)),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, step, steps) => {
    dispatch(GameActionCreator.incrementStep(step, steps));
    dispatch(GameActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
