import React, { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../../store/actions/index";

import Modal from "../../../components/Modal/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2.35),
      marginBottom: theme.spacing(2.35)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2.2),
      marginBottom: theme.spacing(2.2)
    },
    padding: theme.spacing(1.5, 2.25, 0.25, 2.25),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.4, 2.18, 0.22, 2.18)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1.38, 2.16, 0.21, 2.16)
    }
  },
  action: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: theme.spacing(0.5, 0)
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.625),
    marginTop: theme.spacing(0.5)
  }
}));

const Note = (props) => {
  const classes = useStyles();

  const modalRef = useRef();

  const {
    onDeleteNote,
    note: { _id, title, note, updatedAt }
  } = props;

  const [modalProps, setModalProps] = useState({
    title: "",
    content: "",
    confirmText: "OK",
    onConfirmClick: () => console.log("OK")
  });

  const handleDeleteNote = useCallback(() => {
    modalRef.current.openModal();
    setModalProps({
      title: "Delete Note",
      content: "Do you really want to delete this note?",
      confirmText: "Delete Note",
      onConfirmClick: () => {
        onDeleteNote(_id);
      }
    });
  }, [_id, onDeleteNote]);

  return (
    <>
      <Paper variant="outlined" className={classes.root}>
        {title && (
          <Typography style={{ margin: "2px 0 6px 0" }}>
            <b>{title}</b>
          </Typography>
        )}

        <Typography style={{ margin: "6px 0 8px 0" }}>{note}</Typography>

        <Typography variant="body2" className={classes.date}>
          {new Date(updatedAt).toDateString()}
        </Typography>

        <Box className={classes.action}>
          <Link to={`/update-note/${_id}`}>
            <IconButton color="primary" area-controls="edit">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Link>

          <IconButton
            color="secondary"
            area-controls="delete"
            onClick={handleDeleteNote}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
      <Modal
        ref={modalRef}
        title={modalProps.title}
        confirmText={modalProps.confirmText}
        onConfirmClick={modalProps.onConfirmClick}
      >
        {modalProps.content}
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteNote: (noteId) => dispatch(actions.deleteNote(noteId))
});

export default connect(null, mapDispatchToProps)(Note);
