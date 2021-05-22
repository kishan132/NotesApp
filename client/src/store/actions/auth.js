import axios from "axios";
import api from "../../utils/api";

import { setAlert } from "./alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESEND_CODE,
  VERIFY_USER,
  VERIFY_FAIL,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
  LOGOUT,
  LOGOUT_ALL
} from "./actionTypes";

// Register User
export const registerUser = (registerData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/users", registerData);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    dispatch(setAlert("Registered successfully", "success"));
    dispatch(setAlert("Verification code sent to your mobile", "success"));

    history.push("/verify-otp");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const loginUser = (loginData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/users/send-otp", loginData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert("Verification code sent to your mobile", "success"));
    history.push("/verify-otp?from=login");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Verify User
export const verifyUser = (verifyData, history) => async (dispatch) => {
  try {
    const res = await api.post("/users/verify", verifyData);

    dispatch({
      type: VERIFY_USER,
      payload: res.data
    });

    dispatch(setAlert("Account verification successful", "success"));

    history.push("/notes");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert("Something went wrong", "error"));
    }

    dispatch({
      type: VERIFY_FAIL
    });
  }
};

// Resend Verification Code
export const resendCode = (phoneData) => async (dispatch) => {
  try {
    await api.post("/users/send-otp", phoneData);

    dispatch({
      type: RESEND_CODE
    });

    dispatch(setAlert("Verification code re-sent successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
  }
};

// Get User
export const getUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/me");

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update User
export const updateUser = (updateData, history) => async (dispatch) => {
  try {
    const res = await api.patch("/users/me", updateData);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });
    dispatch(setAlert("Account updated successfully", "success"));
    history.push("/notes");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert("Something went wrong", "error"));
    }
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  await api.post("/users/logout");
  dispatch({ type: LOGOUT });
  dispatch(setAlert("Logged out successfully", "success"));
};

// Logout User from All Devices
export const logoutAll = () => async (dispatch) => {
  await api.post("/users/logoutAll");
  dispatch({ type: LOGOUT_ALL });
  dispatch(setAlert("Logged out from all devices successfully", "success"));
};

// Delete User
export const deleteUser = (history) => async (dispatch) => {
  try {
    await api.delete("/users/me");

    dispatch({
      type: DELETE_USER
    });
    dispatch(logoutAll);
    dispatch(setAlert("Account deleted successfully", "success"));
    history.push("/");
  } catch (err) {
    dispatch(setAlert("Failed to delete account", "error"));
  }
};
