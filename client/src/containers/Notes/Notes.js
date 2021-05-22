import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../store/actions/index";

import Note from "./Note/Note";

import Loading from "../../components/Loading/Loading";
const Error = lazy(() => require("../../components/Error/Error"));

const useStyles = makeStyles((theme) => ({
  create: {
    fontSize: theme.spacing(2.2),
    marginRight: theme.spacing(1)
  },
  typography: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  notesBox: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2.5)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2)
    }
  }
}));

const Notes = (props) => {
  const classes = useStyles();

  const {
    notes: { loadingNotes, notes },
    OnGetNotes
  } = props;

  useEffect(() => {
    OnGetNotes();
  }, [OnGetNotes]);

  return (
    <>
      <Helmet>
        <title>My Notes | Notes App</title>
      </Helmet>
      <Box style={{ marginBottom: "16px" }}>
        <Container>
          <section style={{ textAlign: "center" }}>
            <Typography className={classes.typography} variant="h5">
              <b>All Notes</b>
            </Typography>

            <Link to="/create-note" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                <AddRoundedIcon className={classes.create} />
                Create New Note
              </Button>
            </Link>
          </section>

          {loadingNotes ? (
            <Loading>Fetching Notes...</Loading>
          ) : notes.length > 0 ? (
            <Box className={classes.notesBox}>
              {notes.map((note) => (
                <Note key={note._id} note={note} />
              ))}
            </Box>
          ) : (
            <Suspense>
              {" "}
              <Error status="204" statusText="No notes yet." />
            </Suspense>
          )}
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  notes: state.note
});

const mapDispatchToProps = (dispatch) => ({
  OnGetNotes: () => dispatch(actions.getAllNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
