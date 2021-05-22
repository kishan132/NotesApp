import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { makeStyles } from "@material-ui/core/styles";

import notfound from "../../assets/error-404-colour.svg";

const useStyles = makeStyles((theme) => ({
  errorBox: {
    textAlign: "center",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(5)
  },
  heading: {
    marginBottom: theme.spacing(7),
    wordSpacing: theme.spacing(0.4)
  },
  subheading: {
    marginTop: theme.spacing(8)
  },
  btnLink: {
    textDecoration: "none"
  },
  arrow: {
    fontSize: theme.spacing(2.2),
    marginRight: theme.spacing(1)
  },
  image: {
    width: 300,
    height: 300,
    [theme.breakpoints.down("sm")]: {
      width: 275,
      height: 275
    },
    [theme.breakpoints.down("xs")]: {
      width: 250,
      height: 250
    },
    [theme.breakpoints.down(375)]: {
      width: 200,
      height: 200
    }
  }
}));

const WrongRoute = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Page Not Found | NotesApp</title>
      </Helmet>

      <Box className={classes.errorBox}>
        <Paper className={classes.paper} elevation={0}>
          <Typography color="primary" variant="h4" className={classes.heading}>
            SORRY, PAGE NOT FOUND!
          </Typography>

          <img src={notfound} alt="Error" className={classes.image} />

          <Typography
            color="secondary"
            variant="h6"
            className={classes.subheading}
          >
            We can't find the page :(
          </Typography>

          <Link to="/notes" className={classes.btnLink}>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "26px" }}
            >
              <ArrowBackRoundedIcon className={classes.arrow} /> Back To Notes
            </Button>
          </Link>
        </Paper>
      </Box>
    </>
  );
};

export default WrongRoute;
