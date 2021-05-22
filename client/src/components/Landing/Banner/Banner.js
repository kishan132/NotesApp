import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    backgroundColor: "#4A3F44",
    padding: theme.spacing(22.5, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(20, 1.9)
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(17.5, 1.8)
    },
    textAlign: "center"
  },
  heading: {
    color: "#FFFFFF",
    fontSize: theme.spacing(5.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(5.15)
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.spacing(4.8)
    },
    lineHeight: 1.3,
    fontWeight: "bold"
  },
  buttonBottom: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2.85)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2.7)
    }
  },
  linkBtn: {
    textDecoration: "none"
  }
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Typography variant="h1" className={classes.heading}>
          Create Notes Online
        </Typography>
        <Typography variant="h1" className={classes.heading}>
          Anytime &amp; Anywhere
        </Typography>

        <Link to="/notes" className={classes.linkBtn}>
          <Button
            className={classes.buttonBottom}
            size="large"
            variant="contained"
            color="primary"
            aria-label="Create Notes"
            disableElevation
          >
            Create Note Now
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Banner;
