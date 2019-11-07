import React, {PureComponent} from 'react';

const withLoading = (Component) => {
  class WithLoading extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isLoading: true};

      this.handleLoad = this.handleLoad.bind(this);
    }

    handleLoad() {
      this.setState({isLoading: false});
    }

    render() {
      return <Component
        {...this.props}
        isLoading={this.state.isLoading}
        onLoad={this.handleLoad}
      />;
    }
  }

  WithLoading.propTypes = {};

  return WithLoading;
};

export default withLoading;
