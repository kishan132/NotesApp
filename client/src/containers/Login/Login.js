import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../store/actions/index";

import { initialValues, validationSchema } from "./LoginHelper/FormHelper";

import BackButton from "../../components/BackButton/BackButton";
import SuspenseLoading from "../../components/Loading/SuspenseLoading";

const RegisterBox = lazy(() => import("./LoginHelper/RegisterBox"));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto"
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.8, 3)
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2.6, 2)
    },
    borderRadius: theme.spacing(0.75),
    textAlign: "center"
  },
  box: {
    margin: theme.spacing(3, 4),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2.8, 2.8)
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.6, 1.5)
    }
  },
  typography: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  icon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  verifyIcon: {
    fontSize: theme.spacing(6),
    color: "#3f51b5"
  },
  submitBtn: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const {
    auth: { loading, isAuthenticated },
    onLogin,
    history
  } = props;

  if (!loading && isAuthenticated) {
    return <Redirect to="/notes" />;
  }

  const BtnLoading = (
    <>
      Sending OTP... <CircularProgress size={16} className={classes.icon} />
    </>
  );

  return (
    <>
      <Helmet>
        <title>Login | NotesApp</title>
      </Helmet>

      <Box className={classes.root}>
        <Container>
          <BackButton link="/" text="Back To Home" />

          <Paper className={classes.paper} variant="outlined">
            <VerifiedUserRoundedIcon className={classes.verifyIcon} />
            <Typography className={classes.typography} variant="h5">
              <b>Login to NotesApp</b>
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  onLogin(values, history);
                }, 500);
              }}
            >
              {({ submitForm, isSubmitting, errors }) => (
                <Form>
                  <Box className={classes.box}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="phone"
                      type="tel"
                      label="Mobile Number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        )
                      }}
                      autoComplete="off"
                      fullWidth
                    />
                  </Box>
                  <Box className={clsx(classes.box, classes.submitBtn)}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      aria-label="Send OTP"
                      disabled={isSubmitting || errors.phone ? true : false}
                      onClick={submitForm}
                      disableElevation
                    >
                      {isSubmitting ? BtnLoading : "Send OTP"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
          <Suspense fallback={<SuspenseLoading />}>
            <RegisterBox />
          </Suspense>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (loginData, history) =>
    dispatch(actions.loginUser(loginData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
