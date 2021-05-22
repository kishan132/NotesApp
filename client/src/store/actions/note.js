import api from "../../utils/api";

import { setAlert } from "./alert";

import {
  GET_NOTE,
  GET_NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_ERROR,
  NOTES_ERROR
} from "./actionTypes";

// Get Note by id
export const getNoteById = (noteId) => async (dispatch) => {
  try {
    const res = await api.get(`/notes/${noteId}`);

    dispatch({
      type: GET_NOTE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get notes
export const getAllNotes = () => async (dispatch) => {
  try {
    const res = await api.get("/notes");

    dispatch({
      type: GET_NOTES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create a Note
export const createNote = (noteData, history) => async (dispatch) => {
  try {
    const res = await api.post("/notes", noteData);

    dispatch({
      type: CREATE_NOTE,
      payload: res.data
    });
    dispatch(setAlert("Note created successfully", "success"));
    history.push("/notes");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
  }
};

// Update a Note
export const updateNote = (noteId, noteData, history) => async (dispatch) => {
  try {
    const res = await api.patch(`/notes/${noteId}`, noteData);

    dispatch({
      type: UPDATE_NOTE,
      payload: res.data
    });

    dispatch(setAlert("Note updated successfully", "success"));
    history.push("/notes");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert("Failed to update note", "error"));
    }
  }
};

// Delete note by id
export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await api.delete(`/notes/${noteId}`);

    dispatch({
      type: DELETE_NOTE,
      payload: noteId
    });

    dispatch(setAlert("Note deleted successfully", "success"));
  } catch (err) {
    dispatch(setAlert("Failed to delete note", "error"));
  }
};
