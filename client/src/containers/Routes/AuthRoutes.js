import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../../components/Loading/Loading';

const AuthRoutes = (props) => {
  const {
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loading>Fetching User Data...</Loading>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AuthRoutes);
