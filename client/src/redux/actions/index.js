import axios from "axios";

import { AUTH_SIGN_UP, AUTH_ERROR } from "./types";

/*
  ActionCreators -> create/return Actions ({ }) -> dispatched -> middlewares -> reducers
*/

export const signUp = (data) => {
  /*
       1) Use the data and to make HTTP request to our BE and send it along [X]
       2) Take the BE's response (jwtToken is here now!) [X]
       3) Dispatch 'user just signed up' (with jwtToken) [X]
       4) Save the jwtToken into our localStorage [X] CHANGE to Session token []
  */
  return async (dispatch) => {
    try {
      console.log("[action creator] called");
      const res = await axios.post("http://localhost:5000/users/signup", data);
      console.log("res", res);

      console.log("[action creator] dispatched called");
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use!",
      });
    }
  };
};
