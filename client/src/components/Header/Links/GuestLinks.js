import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonRight: {
    marginRight: theme.spacing(2)
  },
  btnLink: {
    textDecoration: "none"
  }
}));

const GuestLinks = () => {
  const classes = useStyles();

  return (
    <>
      <NavLink
        to="/login"
        className={clsx(classes.btnLink, classes.buttonRight)}
      >
        <Button color="primary" variant="outlined">
          Login
        </Button>
      </NavLink>

      <NavLink to="/register" className={classes.btnLink}>
        <Button variant="contained" color="primary" disableElevation>
          Sign Up
        </Button>
      </NavLink>
    </>
  );
};

export default GuestLinks;
