import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import LoseScreen from '../lose-screen/lose-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import AuthorizationScreen from '../authorization-screen/authorization-screen.jsx';
import withAuthData from '../../hocs/with-auth-data/with-auth-data';
import withServerStatus from '../../hocs/with-server-status/with-server-status';

import {Operation as DataOperation} from '../../reducer/data/data';
import {getQuestions} from '../../reducer/data/selectors';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes, getGameTime} from '../../reducer/game/selectors';

import {Operation as UserOperation} from '../../reducer/user/user';
import {getIsAuthorizationRequired, getUserData} from '../../reducer/user/selectors';

import {LoseType} from '../../constants';

const AuthorizationScreenWithState = compose(withServerStatus, withAuthData)(AuthorizationScreen);


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.tickId = null;

    this.handleTick = this.handleTick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    this.props.onLoadQuestions();
    this.props.onAuthUser();
  }

  componentDidUpdate(prevProps) {
    const {gameTime, step, isAuthorizationRequired, onLoadQuestions, onTick} = this.props;

    if (step < 0) {
      this.stopTick();

      if (prevProps.step >= 0) {
        onLoadQuestions();
      }
    } else if ((gameTime && prevProps.gameTime !== gameTime)) {
      this.handleTick();
    } else if ((prevProps.step < 0 || prevProps.isAuthorizationRequired) && !step && !isAuthorizationRequired) {
      onTick();
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
      onWelcomeScreenClick,
    } = this.props;

    if (step < 0) {
      return (
        <WelcomeScreen
          questions={questions.length}
          settings={settings}
          onClick={onWelcomeScreenClick}
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
    const {
      questions,
      mistakes,
      settings,
      gameTime,
      onWelcomeScreenClick,
      onSetUserData
    } = this.props;

    return (
      <Switch>
        <Route path="/" exact render={() => (
          <WelcomeScreen
            questions={questions.length}
            settings={settings}
            onClick={onWelcomeScreenClick}
          />
        )} />
        <Route path="/auth" exact render={() => (
          <AuthorizationScreenWithState onSetUserData={onSetUserData} />
        )} />
        <Route path="/lose" exact render={() => {
          if (mistakes === settings.mistakes) {
            return <LoseScreen type={LoseType.MANY_MISTAKES} />;
          } else if (gameTime === settings.TIMEOUT) {
            return <LoseScreen type={LoseType.TIMEOUT} />;
          }

          return <Redirect to="/" />;
        }} />
        <Route render={() => (
          <h1>
            404 Page Not Found
          </h1>
        )} />
      </Switch>
    );
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
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string
  }).isRequired,
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired,
  onLoadQuestions: PropTypes.func.isRequired,
  onAuthUser: PropTypes.func.isRequired,
  onSetUserData: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: getMistakes(state),
  step: getStep(state),
  gameTime: getGameTime(state),
  questions: getQuestions(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  user: getUserData(state)
});
const mapDispatchToProps = (dispatch) => ({
  onLoadQuestions: () => dispatch(DataOperation.loadQuestions()),
  onAuthUser: () => dispatch(UserOperation.authUser()),
  onSetUserData: (data, onFail) => dispatch(UserOperation.setUserData(data, onFail)),
  onWelcomeScreenClick: () => dispatch(GameActionCreator.incrementStep()),
  onTick: (curTime, gameTime) => dispatch(GameActionCreator.incrementTime(curTime, gameTime)),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, step, steps) => {
    dispatch(GameActionCreator.incrementStep(step, steps));
    dispatch(GameActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
