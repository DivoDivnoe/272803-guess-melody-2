import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withLoadingTracks = (Component) => {
  class WithLoading extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isLoading: true};
    }

    componentDidUpdate(prevProps) {
      const {tracks} = this.props;

      if (!prevProps.tracks.length && tracks.length) {
        this._load();
      }
    }

    _load() {
      const {tracks} = this.props;

      const promises = tracks.map((src) => new Promise((resolve) => {
        const audio = new Audio();

        audio.src = src;
        audio.oncanplaythrough = () => resolve();
      }));

      Promise.all(promises).then(() => this.setState({isLoading: false}));

      setTimeout(() => {
        if (this.state.isLoading) {
          this.setState({isLoading: false});
        }
      }, 10000);
    }

    render() {
      return <Component
        {...this.props}
        isLoading={this.state.isLoading}
      />;
    }
  }

  WithLoading.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  return WithLoading;
};

export default withLoadingTracks;
