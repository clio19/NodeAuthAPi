import { combineReducers } from "redux";

import { reducer as fromReducer } from "redux-form";

import authReducer from "./auth";
import dashboardReducer from "./dashboard";

export default combineReducers({
  form: fromReducer,
  auth: authReducer,
  dash: dashboardReducer,
});
