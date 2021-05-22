import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";

import * as actions from "../../store/actions/index";

import Note from "./Note";

const CreateNote = (props) => {
  const { history, onCreate } = props;

  const initialValues = {
    title: "",
    note: ""
  };

  const handleSubmit = (values) => {
    onCreate(values, history);
  };

  return (
    <>
      <Helmet>
        <title>Create a Note | NotesApp</title>
      </Helmet>

      <Note initialValues={initialValues} handleSubmit={handleSubmit} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onCreate: (noteData, history) =>
    dispatch(actions.createNote(noteData, history))
});

export default connect(null, mapDispatchToProps)(CreateNote);
