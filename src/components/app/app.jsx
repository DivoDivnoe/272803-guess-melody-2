import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessGenreScreen from '../guess-genre-screen/guess-genre-screen.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/reducer.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return this._getScreen();
  }

  _getScreen() {
    const {
      questions,
      mistakes,
      settings,
      step,
      onWelcomeScreenClick,
      onUserAnswer
    } = this.props;

    if (step < 0) {
      return <WelcomeScreen settings={settings} onClick={onWelcomeScreenClick} />;
    }

    const question = questions[step];

    switch (question.type) {
      case `artist`:
        return <GuessArtistScreen
          question={question}
          screenIndex={step}
          mistakes={mistakes}
          onAnswer={
            (userAnswer) => onUserAnswer(userAnswer, question, mistakes, settings.maxMistakes, step, questions.length)
          }
        />;
      case `genre`:
        return <GuessGenreScreen
          question={question}
          screenIndex={step}
          mistakes={mistakes}
          onAnswer={
            (userAnswer) => onUserAnswer(userAnswer, question, mistakes, settings.maxMistakes, step, questions.length)
          }
        />;
    }

    return null;
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
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  mistakes: state.mistakes,
  step: state.step
});
const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, step, steps) => {
    dispatch(ActionCreator.incrementStep(step, steps));
    dispatch(ActionCreator.incrementMistakes(userAnswer, question, mistakes, maxMistakes));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
