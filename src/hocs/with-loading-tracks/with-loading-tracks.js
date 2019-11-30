import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const TIMEOUT = 10000;

const withLoadingTracks = (Component) => {
  class WithLoading extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isLoading: true};
      this.promises = [];
    }

    componentDidMount() {
      this.props.onLoadQuestions();
    }

    componentDidUpdate(prevProps) {
      const {tracks} = this.props;

      if (prevProps.tracks !== tracks.length) {
        this._load();
      }
    }

    componentWillUnmount() {
      if (this.state.isLoading) {
        this.promises.forEach((promise) => Promise.resolve(promise));
      }
    }

    _load() {
      const {tracks} = this.props;

      this.promises = tracks.map((src) => new Promise((resolve) => {
        const audio = new Audio();

        audio.src = src;
        audio.oncanplaythrough = () => resolve();

        setTimeout(() => {
          audio.oncanplaythrough = null;
          resolve();
        }, TIMEOUT);
      }));

      Promise.all(this.promises).then(() => {
        this.setState({isLoading: false});
        this.promises = [];
      });
    }

    render() {
      return <Component
        {...this.props}
        isLoading={this.state.isLoading}
      />;
    }
  }

  WithLoading.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.string).isRequired,
    onLoadQuestions: PropTypes.func.isRequired
  };

  return WithLoading;
};

export default withLoadingTracks;
