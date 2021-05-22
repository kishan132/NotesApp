import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import GuestLinks from "./Links/GuestLinks";
import AuthLinks from "./Links/AuthLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  buttonRight: {
    marginRight: theme.spacing(2)
  },
  btnLink: {
    textDecoration: "none"
  },
  title: {
    flexGrow: 1
  }
}));

const Header = (props) => {
  const classes = useStyles();

  const {
    auth: { isAuthenticated }
  } = props;

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="transparent" variant="outlined">
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" color="primary" className={classes.title}>
              <Link to="/" className={classes.btnLink}>
                <b>NotesApp</b>
              </Link>
            </Typography>

            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
