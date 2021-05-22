import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";

import * as actions from "../../store/actions/index";
import Register from "./Register";

import Loading from "../../components/Loading/Loading";

const UpdateAccount = (props) => {
  const {
    auth: { loading, user },
    onGetUser,
    onUpdateAccount,
    history
  } = props;

  useEffect(() => {
    onGetUser();
  }, [onGetUser]);

  const handleSubmit = (values) => {
    onUpdateAccount(
      {
        name: values.name
      },
      history
    );
  };

  if (loading) {
    return <Loading>Fetching User Data...</Loading>;
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>
            Update Account {user.name === undefined ? null : `- ${user.name}`} |
            NotesApp
          </title>
        </Helmet>

        <Register
          initialValues={{
            name: user.name,
            phone: user.phone
          }}
          handleSubmit={handleSubmit}
          edit
        />
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actions.getUser()),
  onUpdateAccount: (userData, history) =>
    dispatch(actions.updateUser(userData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);
