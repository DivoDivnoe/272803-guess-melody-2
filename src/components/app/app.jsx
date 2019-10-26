import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessArtistScreen from '../guess-artist-screen/guess-artist-screen.jsx';
import GuessGenreScreen from '../guess-genre-screen/guess-genre-screen.jsx';

class App extends PureComponent {
  static getScreen(question, props, onUserAnswer) {
    if (question < 0) {
      return <WelcomeScreen settings={props.settings} onClick={onUserAnswer} />;
    }

    const {questions} = props;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `artist`:
        return <GuessArtistScreen
          question={currentQuestion}
          screenIndex={question}
          onClick={onUserAnswer}
        />;
      case `genre`:
        return <GuessGenreScreen
          question={currentQuestion}
          screenIndex={question}
          onSubmit={onUserAnswer}
        />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1
    };
  }

  render() {
    return App.getScreen(this.state.question, this.props, () => this._switchQuestion());
  }

  _switchQuestion() {
    const {questions} = this.props;

    this.setState({
      question: this.state.question + 1 >= questions.length ? -1 : this.state.question + 1
    });
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
  })
};

export default App;
