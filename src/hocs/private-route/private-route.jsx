import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect, useHistory} from 'react-router-dom';


const PrivateRoute = (props) => {
  const {render, isAuthenticated} = props;

  if (isAuthenticated) {
    return <Route {...props} render={render} />;
  }

  const history = useHistory();
  history.push(props.path);

  return <Redirect to="/auth" />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired
};

export default PrivateRoute;
