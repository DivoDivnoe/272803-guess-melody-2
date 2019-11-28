import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import LoseScreen from '../lose-screen/lose-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import AuthorizationScreen from '../authorization-screen/authorization-screen.jsx';
import withAuthData from '../../hocs/with-auth-data/with-auth-data';
import withServerStatus from '../../hocs/with-server-status/with-server-status';
import withReplay from '../../hocs/with-replay/with-replay';
import PrivateRoute from '../../hocs/private-route/private-route.jsx';

import {Operation as DataOperation} from '../../reducer/data/data';
import {getQuestions} from '../../reducer/data/selectors';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes, getGameTime} from '../../reducer/game/selectors';

import {Operation as UserOperation} from '../../reducer/user/user';
import {getUserData} from '../../reducer/user/selectors';

import {LoseType} from '../../constants';

const AuthorizationScreenWithState = compose(withServerStatus, withAuthData)(AuthorizationScreen);
const LoseScreenWithReplay = withReplay(LoseScreen);
const WinScreenWithReplay = withReplay(WinScreen);


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.tickId = null;

    this.handleTick = this.handleTick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleStopTick = this.handleStopTick.bind(this);
  }

  componentDidMount() {
    this.props.onLoadQuestions();
  }

  componentDidUpdate(prevProps) {
    const {gameTime, step, onLoadQuestions, onTick, settings} = this.props;

    if (gameTime < settings.time && prevProps.gameTime !== gameTime) {
      this.handleTick();
    } else if (prevProps.step < 0 && !step) {
      onTick();
    }

    if (prevProps.step >= 0 && step < 0) {
      onLoadQuestions();
    }
  }

  handleTick() {
    const {onTick} = this.props;

    this.tickId = setTimeout(() => onTick(), 1000);
  }

  handleStopTick() {
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
      step,
      onUserAnswer
    } = this.props;

    const question = questions[step];

    onUserAnswer(userAnswer, question);
  }

  render() {
    const {
      step,
      questions,
      mistakes,
      settings,
      gameTime,
      user,
      onWelcomeScreenClick,
      onSetUserData,
      onReplay
    } = this.props;

    return (
      <Switch>
        <Route path="/" exact render={() => {
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
              settings={settings}
              question={question}
              screenIndex={step}
              mistakes={mistakes}
              gameTime={timeLeft}
              onStopTick={this.handleStopTick}
              onAnswer={this.handleAnswer}
            />
          );
        }} />
        <Route path="/auth" exact render={({history}) => (
          <AuthorizationScreenWithState onSetUserData={onSetUserData} history={history} />
        )} />
        <PrivateRoute path="/win" exact isAuthenticated={!!Object.keys(user).length} render={({history}) => {
          if (step < questions.length) {
            return <Redirect to="/" />;
          }

          return <WinScreenWithReplay mistakes={mistakes} gameTime={gameTime} history={history} onReplay={onReplay} />;
        }} />
        <Route path="/lose" exact render={({history}) => {
          if (mistakes === settings.mistakes) {
            return <LoseScreenWithReplay type={LoseType.MANY_MISTAKES} history={history} onReplay={onReplay} />;
          } else if (gameTime >= settings.time) {
            return <LoseScreenWithReplay type={LoseType.TIMEOUT} history={history} onReplay={onReplay} />;
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
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired,
  onLoadQuestions: PropTypes.func.isRequired,
  onSetUserData: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: getMistakes(state),
  step: getStep(state),
  gameTime: getGameTime(state),
  questions: getQuestions(state),
  user: getUserData(state)
});
const mapDispatchToProps = (dispatch) => ({
  onLoadQuestions: () => dispatch(DataOperation.loadQuestions()),
  onSetUserData: (data, onFail) => dispatch(UserOperation.setUserData(data, onFail)),
  onWelcomeScreenClick: () => dispatch(GameActionCreator.incrementStep()),
  onTick: () => dispatch(GameActionCreator.incrementTime()),
  onReplay: () => dispatch(GameActionCreator.replay()),
  onUserAnswer: (userAnswer, question) => {
    dispatch(GameActionCreator.incrementStep());
    dispatch(GameActionCreator.incrementMistakes(userAnswer, question));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
