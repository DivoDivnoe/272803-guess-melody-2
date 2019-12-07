import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAuthData = (Component) => {
  class WithAuthData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        name: ``,
        password: ``
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleChange(name, value) {
      this.setState({
        [name]: value
      });
    }

    handleSuccess() {
      this.props.history.goBack();
    }

    render() {
      const {name, password} = this.state;

      return (
        <Component
          {...this.props}
          name={name}
          password={password}
          onChange={this.handleChange}
          onSuccess={this.handleSuccess}
        />
      );
    }
  }

  WithAuthData.propTypes = {
    history: PropTypes.object.isRequired
  };

  return WithAuthData;
};

export default withAuthData;
