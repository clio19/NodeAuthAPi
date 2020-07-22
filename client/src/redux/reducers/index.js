import { combineReducers } from "redux";

import { reducer as fromReducer } from "redux-form";
import authReducer from "./auth";

export default combineReducers({
  form: fromReducer,
  auth: authReducer,
});
