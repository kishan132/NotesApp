import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../../components/Loading/Loading';

const AuthRoutes = (props) => {
  const {
    component: Component,
    onGetUser,
    auth: { isAuthenticated, loading },
    ...rest
  } = props;
  
  useEffect(() => {
    onGetUser();
  }, [onGetUser]);

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

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actions.getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);
