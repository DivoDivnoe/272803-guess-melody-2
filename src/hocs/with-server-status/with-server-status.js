import React, {PureComponent} from 'react';
import {StatusCode} from '../../constants';

const withServerStatus = (Component) => {
  class WithServerStatus extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        serverStatus: StatusCode.OK
      };

      this.handleChangeServerStatus = this.handleChangeServerStatus.bind(this);
    }

    handleChangeServerStatus(statusCode) {
      this.setState({
        serverStatus: statusCode
      });
    }

    render() {
      const {serverStatus} = this.state;

      return (
        <Component
          {...this.props}
          serverStatus={serverStatus}
          onChangeServerStatus={this.handleChangeServerStatus}
        />
      );
    }
  }

  WithServerStatus.propTypes = {};

  return WithServerStatus;
};

export default withServerStatus;
