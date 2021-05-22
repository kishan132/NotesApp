import { nanoid } from "nanoid";

import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";

// Set Alert and Remove Alert
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = nanoid();

    dispatch({
      type: SET_ALERT,
      payload: { id, msg, alertType }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  };
