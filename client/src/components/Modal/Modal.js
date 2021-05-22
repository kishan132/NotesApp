import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(0, 1)
  },
  action: {
    padding: theme.spacing(2)
  },
  noaction: {
    padding: theme.spacing(3),
    textAlign: 'center'
  }
}));

const Modal = forwardRef((props, ref) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const {
    title,
    children,
    noAction,
    noActionText,
    confirmText,
    onConfirmClick
  } = props;

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false)
    };
  });

  return ReactDOM.createPortal(
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent id="alert-dialog-description">
        <Box className={classes.content}>{children}</Box>
      </DialogContent>

      {noAction ? (
        <Box className={classes.noaction}>
          <Typography color="secondary">{noActionText}</Typography>
        </Box>
      ) : (
        <DialogActions className={classes.action}>
          <Button
            style={{ marginRight: '8px' }}
            onClick={() => setIsOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirmClick}
            color="primary"
            variant="contained"
            disableElevation
            autoFocus
          >
            {confirmText}
          </Button>
        </DialogActions>
      )}
    </Dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
