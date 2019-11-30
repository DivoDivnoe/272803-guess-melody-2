import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = (props) => {
  const {render, isAuthenticated} = props;

  if (isAuthenticated) {
    console.log('to /win');
    return <Route {...props} render={render} />;
  }

  return <Redirect to="/auth" />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired
};

export default PrivateRoute;
