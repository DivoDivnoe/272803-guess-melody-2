import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();
  }

  render() {
    const {isPlaying, onClick, isLoading} = this.props;
    const states = [`play`, `pause`];

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${states[+isPlaying]}`}
          type="button"
          onClick={onClick}
          disabled={isLoading}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const {src, onLoad} = this.props;

    const audio = this._audioRef.current;

    audio.src = src;
    audio.oncanplaythrough = onLoad;

  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.src = ``;
  }
}

Player.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default Player;
