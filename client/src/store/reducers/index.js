import { combineReducers } from "redux";

import authReducer from "./auth";
import alertReducer from "./alert";
import noteReducer from "./note";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  note: noteReducer
});
