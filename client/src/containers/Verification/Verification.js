import React, { lazy, Suspense, useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import * as QueryString from "query-string";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import * as actions from "../../store/actions/index";

import BackButton from "../../components/BackButton/BackButton";
import SuspenseLoading from "../../components/Loading/SuspenseLoading";

const VerificationHelper = lazy(() => import("./VerificationHelper"));

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
  typography: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  timer: {
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.2)
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0.9)
    },
    fontWeight: "bold"
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
  icon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  lockIcon: {
    fontSize: theme.spacing(6),
    color: "#3F51B5"
  }
}));

const Verification = (props) => {
  const classes = useStyles();

  const isSmallScreen = useMediaQuery("(max-width:400px)");

  const {
    auth: { isAuthenticated, user },
    onVerify,
    onResend,
    history,
    location
  } = props;

  const [isMounted, setIsMounted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resending, setResending] = useState(false);

  const reduceTimer = useCallback(() => {
    if (isMounted) {
      setTimer(60);
      let myTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(myTimer);
      }, 60000);
    } else return;
  }, [isMounted]);

  const fromUrl = QueryString.parse(location.search).from;

  useEffect(() => {
    setIsMounted(true);
    reduceTimer();

    return () => setIsMounted(false);
  }, [reduceTimer]);

  if (isAuthenticated) {
    return user && user.isProfile ? (
      <Redirect to="/tournaments" />
    ) : (
      <Redirect to="/create-dashboard" />
    );
  }

  const handleResend = () => {
    setResending(true);
    onResend({
      phone: user && user.phone
    });
    setTimeout(() => {
      setResending(false);
      reduceTimer();
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Verify OTP | NotesApp</title>
      </Helmet>

      <Box className={classes.root}>
        <Container>
          <BackButton
            link={fromUrl === "login" ? "/login" : "/register"}
            text={fromUrl === "login" ? "Back To Login" : "Back To Register"}
          />

          <Paper className={classes.paper} variant="outlined">
            <LockOpenOutlinedIcon className={classes.lockIcon} />

            <Typography variant="h5" className={classes.typography}>
              <b>Verification Code</b>
            </Typography>

            <Formik
              initialValues={{
                phone: (user && user.phone) || "",
                code: ""
              }}
              validationSchema={Yup.object({
                phone: Yup.string()
                  .required("Required")
                  .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number"),
                code: Yup.string()
                  .required("Required")
                  .matches(/^\d{6}$/, "Invalid Verification Code")
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  onVerify(values, history);
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
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        )
                      }}
                      autoComplete="off"
                      fullWidth
                    />
                  </Box>
                  <Box className={classes.box}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="code"
                      type="tel"
                      label="Verification Code"
                      placeholder="6 digit code"
                      autoComplete="one-time-code"
                      fullWidth
                    />
                  </Box>

                  <Box
                    className={classes.box}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    {timer === 0 ? (
                      <Button
                        size="large"
                        color="primary"
                        disabled={timer === 0 ? false : true}
                        onClick={handleResend}
                      >
                        {resending ? (
                          <>
                            Resending...{" "}
                            <CircularProgress
                              size={16}
                              className={classes.icon}
                            />
                          </>
                        ) : isSmallScreen ? (
                          "Resend"
                        ) : (
                          "Resend Code"
                        )}
                      </Button>
                    ) : (
                      <Typography variant="body2" className={classes.timer}>
                        {isSmallScreen
                          ? `RESEND (${timer} s)`
                          : `RESEND IN ${timer} SECONDS`}
                      </Typography>
                    )}

                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting || errors.code ? true : false}
                      onClick={submitForm}
                      disableElevation
                      style={{ marginLeft: "auto" }}
                    >
                      {isSubmitting ? (
                        <>
                          Verifying...{" "}
                          <CircularProgress
                            size={16}
                            className={classes.icon}
                          />
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>

          <Suspense fallback={<SuspenseLoading />}>
            <VerificationHelper url={fromUrl} />
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
  onResend: (phoneData) => dispatch(actions.resendCode(phoneData)),
  onVerify: (verifyData, history) =>
    dispatch(actions.verifyUser(verifyData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
