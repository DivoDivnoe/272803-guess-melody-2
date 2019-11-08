import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Player from '../../components/player/player.jsx';
import withLoading from '../with-loading/with-loading';

const WithLoadingPlayer = withLoading(Player);

const DEFAULT_ACTIVE_PLAYER = 0;
const NO_ACTIVE_PLAYER_VALUE = -1;

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {activePlayer: DEFAULT_ACTIVE_PLAYER};

      this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {screenIndex} = this.props;

      if (prevProps.screenIndex !== screenIndex) {
        this.setState({activePlayer: DEFAULT_ACTIVE_PLAYER});
      }
    }

    handleClick(index) {
      this.setState((prevState) => ({
        activePlayer: prevState.activePlayer === index ? NO_ACTIVE_PLAYER_VALUE : index
      }));
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(item, index) => (
          <WithLoadingPlayer
            src={item.src}
            isPlaying={index === activePlayer}
            onClick={() => this.handleClick(index)}
          />
        )}
      />;
    }
  }

  WithActivePlayer.propTypes = {
    screenIndex: PropTypes.number.isRequired
  };

  return WithActivePlayer;
};

export default withActivePlayer;
