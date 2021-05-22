import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_USER,
  VERIFY_FAIL,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
  LOGOUT,
  LOGOUT_ALL
} from "../actions/actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  error: {}
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: payload
      };
    case VERIFY_USER:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
        error: {}
      };
    case VERIFY_FAIL:
      return { ...state, isAuthenticated: false, loading: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: { ...state.user, ...payload }
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return { ...state, loading: false, isAuthenticated: false };
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
        error: {}
      };
    case USER_ERROR:
      return {
        ...state,
        isAuthenticated: true,
        error: payload,
        loading: false
      };
    case LOGOUT:
    case LOGOUT_ALL:
    case DELETE_USER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
