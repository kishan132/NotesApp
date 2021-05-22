import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import * as actions from "../../store/actions/index";

import Register from "./Register";

const CreateAccount = (props) => {
  const {
    auth: { isAuthenticated },
    onCreateAccount,
    history
  } = props;

  if (isAuthenticated) {
    return <Redirect to="/notes" />;
  }

  const handleSubmit = (values) => {
    onCreateAccount(values, history);
  };

  return (
    <>
      <Helmet>
        <title>Create an Account | NotesApp</title>
      </Helmet>

      <Register
        initialValues={{
          name: "",
          phone: ""
        }}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onCreateAccount: (registerData, history) =>
    dispatch(actions.registerUser(registerData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
