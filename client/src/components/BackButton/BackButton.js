import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backBox: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3.5)
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3)
    },
    padding: theme.spacing(1, 0)
  },
  arrow: {
    fontSize: theme.spacing(2.2),
    marginRight: theme.spacing(1)
  }
}));

const BackButton = (props) => {
  const classes = useStyles();

  const { link, text } = props;

  return (
    <Paper className={classes.backBox} elevation={0}>
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Button color="primary">
          <ArrowBackRoundedIcon className={classes.arrow} color="primary" />
          {text}
        </Button>
      </Link>
    </Paper>
  );
};

export default BackButton;
