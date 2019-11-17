import React, {PureComponent} from 'react';

const withAuthData = (Component) => {
  class WithAuthData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        name: ``,
        password: ``
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, value) {
      this.setState({
        [name]: value
      });
    }

    render() {
      const {name, password} = this.state;

      return (
        <Component
          {...this.props}
          name={name}
          password={password}
          onChange={this.handleChange}
        />
      );
    }
  }

  WithAuthData.propTypes = {};

  return WithAuthData;
};

export default withAuthData;
