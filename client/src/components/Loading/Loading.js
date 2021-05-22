import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import loading from '../../assets/loading.svg';

const useStyles = makeStyles((theme) => ({
  loadingBox: {
    textAlign: 'center',
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(5)
  },
  loadingIcon: {
    marginLeft: theme.spacing(0.75),
    verticalAlign: 'text-top'
  },
  image: {
    width: 300,
    height: 300,
    [theme.breakpoints.down('sm')]: {
      width: 275,
      height: 275
    },
    [theme.breakpoints.down('xs')]: {
      width: 250,
      height: 250
    },
    [theme.breakpoints.down(375)]: {
      width: 200,
      height: 200
    }
  }
}));

const Loading = (props) => {
  const classes = useStyles();

  const { children, hideImage } = props;

  return (
    <Box className={classes.loadingBox}>
      <Paper className={classes.paper} elevation={0}>
        {hideImage || hideImage === true ? null : (
          <img src={loading} alt="Loading..." className={classes.image} />
        )}

        <Typography color="primary" variant="h6">
          {children}{' '}
          <CircularProgress
            size={24}
            color="primary"
            className={classes.loadingIcon}
          />
        </Typography>
      </Paper>
    </Box>
  );
};

export default Loading;
