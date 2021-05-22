import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";

import * as actions from "../../store/actions/index";
import Note from "./Note";

import Loading from "../../components/Loading/Loading";
const Error = lazy(() => import("../../components/Error/Error"));

const UpdateNote = (props) => {
  const {
    history,
    onGetNote,
    onUpdate,
    match,
    notes: { loadingNote, note, noteError }
  } = props;

  const noteId = match.params.noteId;

  useEffect(() => {
    onGetNote(noteId);
  }, [onGetNote, noteId]);

  const handleSubmit = ({ title, note }) => {
    onUpdate(noteId, { title, note }, history);
  };

  if (loadingNote || note === null) {
    return <Loading>Fetching Note Data...</Loading>;
  }

  if (note === null && noteError && noteError.status) {
    return (
      <Suspense>
        <Error status={noteError.status} statusText={noteError.msg} />
      </Suspense>
    );
  }

  if (note) {
    return (
      <>
        <Helmet>
          <title>Update Note | NotesApp</title>
        </Helmet>

        <Note
          initialValues={{
            ...note
          }}
          handleSubmit={handleSubmit}
          edit
        />
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  notes: state.note
});

const mapDispatchToProps = (dispatch) => ({
  onGetNote: (noteId) => dispatch(actions.getNoteById(noteId)),
  onUpdate: (noteId, noteData, history) =>
    dispatch(actions.updateNote(noteId, noteData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote);
