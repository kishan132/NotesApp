import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3.8),
      paddingTop: theme.spacing(2.4),
      paddingBottom: theme.spacing(2.4)
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3.6),
      paddingTop: theme.spacing(2.3),
      paddingBottom: theme.spacing(2.3)
    },
    borderRadius: theme.spacing(0.75),
    textAlign: 'center'
  }
}));

const VerificationHelper = (props) => {
  const classes = useStyles();

  const { url } = props;

  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography>
        Wrong mobile number?{' '}
        <Link to={url === 'login' ? '/login' : '/register'}>Change Number</Link>
      </Typography>
    </Paper>
  );
};

export default VerificationHelper;
