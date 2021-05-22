import {
  GET_NOTE,
  GET_NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_ERROR,
  NOTES_ERROR
} from "../actions/actionTypes";

const initialState = {
  notes: [],
  note: null,
  notesError: {},
  noteError: {},
  loadingNote: true,
  loadingNotes: true
};

const matchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loadingNotes: false,
        notesError: {}
      };
    case GET_NOTE:
      return { ...state, note: payload, loadingNote: false, noteError: {} };
    case CREATE_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
        loadingNote: false
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === payload._id ? { ...note, ...payload } : note
        ),
        note: { ...state.note, ...payload },
        loadingNote: false
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
        note: null,
        loadingNote: false
      };
    case NOTE_ERROR:
      return {
        ...state,
        note: null,
        noteError: payload,
        loadingNote: false
      };
    case NOTES_ERROR:
      return { ...state, notesError: payload, loadingNotes: false };
    default:
      return state;
  }
};

export default matchReducer;
