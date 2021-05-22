import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  alertBox: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2.5)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2)
    }
  },
  alert: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.35),
      marginBottom: theme.spacing(1.35)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1.2),
      marginBottom: theme.spacing(1.2)
    },
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.4)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1.3)
    }
  }
}));

const Alert = (props) => {
  const classes = useStyles();

  const { alerts } = props;

  return (
    <Box className={classes.alertBox}>
      <Container>
        {alerts.map((alert) => {
          let borderColor = grey[500];
          if (alert.alertType === "error") {
            borderColor = red[500];
          } else if (alert.alertType === "success") {
            borderColor = green[500];
          }
          return (
            <MuiAlert
              key={alert.id}
              severity={alert.alertType}
              className={classes.alert}
              style={{ border: `1px solid ${borderColor}` }}
            >
              {alert.msg}
            </MuiAlert>
          );
        })}
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
