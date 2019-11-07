import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAnswers = (Component) => {
  class WithAnswers extends PureComponent {
    constructor(props) {
      super(props);

      const answer = Array.from({length: props.question.answers.length}, () => 0);
      this.state = {answer};

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
      this.setState((prevState) => {
        const checks = prevState.answer.slice();
        checks[index] = +!checks[index];

        return {answer: checks};
      });
    }

    render() {
      return <Component
        {...this.props}
        answer={this.state.answer}
        onClick={this.handleClick}
      />;
    }
  }

  WithAnswers.propTypes = {
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.exact({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  return WithAnswers;
};

export default withAnswers;
