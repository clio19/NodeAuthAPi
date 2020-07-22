import { combineReducers } from "redux";
import { reducer as fromReducer } from "redux-form";

export default combineReducers({
  form: fromReducer,
});
