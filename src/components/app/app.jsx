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
import withLoadingTracks from '../../hocs/with-loading-tracks/with-loading-tracks';
import PrivateRoute from '../../hocs/private-route/private-route.jsx';

import {Operation as DataOperation} from '../../reducer/data/data';
import {getQuestions} from '../../reducer/data/selectors';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes, getGameTime, getLastAnswerTime, getPoints, getFastPoints} from '../../reducer/game/selectors';

import {Operation as UserOperation} from '../../reducer/user/user';
import {getUserData} from '../../reducer/user/selectors';

import {LoseType} from '../../constants';

const AuthorizationScreenWithState = compose(withServerStatus, withReplay, withAuthData)(AuthorizationScreen);
const LoseScreenWithReplay = withReplay(LoseScreen);
const WinScreenWithReplay = withReplay(WinScreen);
const WelcomeScreenWithLoading = withLoadingTracks(WelcomeScreen);


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  componentDidMount() {
    this.props.onGetUserData();
  }

  handleAnswer(userAnswer) {
    const {
      questions,
      step,
      onUserAnswer,
      gameTime,
      lastAnswerTime
    } = this.props;

    const question = questions[step];

    onUserAnswer(userAnswer, question, gameTime, lastAnswerTime);
  }

  handleReset() {
    this.props.onReset();
  }

  handleStartGame() {
    this.props.onWelcomeScreenClick();
  }

  render() {
    const {
      step,
      questions,
      mistakes,
      settings,
      gameTime,
      user,
      points,
      fastPoints,
      onSetUserData,
      onReplay,
      onTick,
      onLoadQuestions
    } = this.props;

    return (
      <Switch>
        <Route path="/" exact render={() => {
          if (step < 0) {
            const tracks = questions.map((item) => {
              switch (item.type) {
                case `artist`:
                  return item.song.src;
                case `genre`:
                  return item.answers.map((answer) => answer.src);
              }

              return null;
            }).reduce((acc, cur) => acc.concat(cur), []);

            return (
              <WelcomeScreenWithLoading
                settings={settings}
                tracks={tracks}
                onLoadQuestions={onLoadQuestions}
                onClick={this.handleStartGame}
              />
            );
          }

          const timeLeft = settings.time - gameTime;

          return (
            <GameScreen
              settings={settings}
              questions={questions}
              screenIndex={step}
              mistakes={mistakes}
              gameTime={timeLeft}
              step={step}
              questionsAmount={questions.length}
              onAnswer={this.handleAnswer}
              onReset={this.handleReset}
              onTick={onTick}
            />
          );
        }} />
        <Route path="/auth" exact render={({history}) => {
          if (mistakes >= settings.mistakes || gameTime >= settings.time || step < questions.length) {
            return <Redirect to="/" />;
          }

          return (
            <AuthorizationScreenWithState
              mistakes={mistakes}
              gameTime={gameTime}
              history={history}
              points={points}
              fastPoints={fastPoints}
              onReplay={onReplay}
              onSetUserData={onSetUserData}
            />
          );
        }} />
        <PrivateRoute path="/win" exact isAuthenticated={!!Object.keys(user).length} render={({history}) => {
          return (
            <WinScreenWithReplay
              mistakes={mistakes}
              gameTime={gameTime}
              points={points}
              history={history}
              fastPoints={fastPoints}
              onReplay={onReplay}
            />
          );
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
  lastAnswerTime: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  fastPoints: PropTypes.number.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired,
  onLoadQuestions: PropTypes.func.isRequired,
  onGetUserData: PropTypes.func.isRequired,
  onSetUserData: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: getMistakes(state),
  step: getStep(state),
  gameTime: getGameTime(state),
  questions: getQuestions(state),
  user: getUserData(state),
  lastAnswerTime: getLastAnswerTime(state),
  points: getPoints(state),
  fastPoints: getFastPoints(state)
});
const mapDispatchToProps = (dispatch) => ({
  onLoadQuestions: () => dispatch(DataOperation.loadQuestions()),
  onGetUserData: () => dispatch(UserOperation.getUserData()),
  onSetUserData: (data, onSuccess, onFail) => dispatch(UserOperation.setUserData(data, onSuccess, onFail)),
  onWelcomeScreenClick: () => dispatch(GameActionCreator.incrementStep()),
  onTick: () => dispatch(GameActionCreator.incrementTime()),
  onReplay: () => {
    dispatch(GameActionCreator.replay());
  },
  onReset: () => dispatch(GameActionCreator.reset()),
  onUserAnswer: (userAnswer, question, gameTime, lastAnswerTime) => {
    dispatch(GameActionCreator.incrementStep());
    dispatch(GameActionCreator.incrementMistakes(userAnswer, question));
    dispatch(GameActionCreator.addPoints(gameTime, lastAnswerTime));
    dispatch(GameActionCreator.setLastAnswerTime());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
