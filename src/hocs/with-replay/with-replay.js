import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withReplay = (Component) => {
  class WithReplay extends PureComponent {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderButton={() => (
          <button
            className="replay"
            type="button"
            onClick={this.handleClick}
          >Попробовать ещё раз</button>
        )}
      />;
    }

    handleClick() {
      const {onReplay, history} = this.props;

      onReplay();
      history.push(`/`);
    }
  }

  WithReplay.propTypes = {
    history: PropTypes.object.isRequired,
    onReplay: PropTypes.func.isRequired
  };

  return WithReplay;
};

export default withReplay;
