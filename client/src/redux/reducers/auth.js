import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
} from "../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: "",
  // methods: [],
  errorMessage: "",
};

const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      console.log("[Auth Reducer] AUTH_SIGN_UP reducer called");

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        errorMessage: "",
      };
    case AUTH_SIGN_IN:
      console.log("[Auth Reducer] AUTH_SIGN_IN reducer called");
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        errorMessage: "",
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: false,
        errorMessage: "",
      };
    case AUTH_ERROR:
      console.log("[Auth Reducer] AUTH_ERROR reducer called");
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
