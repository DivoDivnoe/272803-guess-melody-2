import React, {PureComponent} from 'react';
import Player from '../../components/player/player.jsx';
import withLoading from '../with-loading/with-loading';

const WithLoadingPlayer = withLoading(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {activePlayer: -1};

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
      this.setState((prevState) => ({activePlayer: prevState.activePlayer === index ? -1 : index}));
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

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
