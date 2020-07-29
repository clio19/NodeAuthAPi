import axios from "axios";

import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  DASHBOARD_GET_DATA,
  AUTH_LINK_GOOGLE,
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_GOOGLE,
  AUTH_UNLINK_FACEBOOK,
} from "./types";

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
      const res = await axios.post(
        "http://localhost:5000/users/signup",
        data
        // , {
        //   withCredentials: true,
        // }  do not need because on index axios.defaults.withCredentials = true;
      );
      console.log("res", res);

      console.log("[action creator] dispatched called");
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      // localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (err) {
      console.log("====================================");
      console.log(err.message);
      console.log("====================================");
      dispatch({
        type: AUTH_ERROR,
        payload: "Email error try another one!",
      });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    // localStorage.removeItem("JWT_TOKEN");

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/users/signin", data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      // localStorage.setItem("JWT_TOKEN", res.data.token);
      // axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      console.log("ERROR !", err);
      dispatch({
        type: AUTH_ERROR,
        payload: "Email or password combination isn't valid",
      });
    }
  };
};

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:5000/users/oauth/google", {
      access_token: data,
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });

    // localStorage.setItem("JWT_TOKEN", res.data.token);
    // axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const linkGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:5000/users/oauth/link/google",
      {
        access_token: data,
      }
    );

    dispatch({
      type: AUTH_LINK_GOOGLE,
      payload: res.data,
    });
  };
};

export const unlinkGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:5000/users/oauth/unlink/google"
    );

    dispatch({
      type: AUTH_UNLINK_GOOGLE,
      payload: res.data,
    });
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:5000/users/oauth/facebook", {
      access_token: data,
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });

    // localStorage.setItem("JWT_TOKEN", res.data.token);
    // axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};
export const linkFacebook = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:5000/users/oauth/link/facebook",
      {
        access_token: data,
      }
    );

    dispatch({
      type: AUTH_LINK_FACEBOOK,
      payload: res.data,
    });
  };
};

export const unlinkFacebook = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:5000/users/oauth/unlink/facebook"
    );

    dispatch({
      type: AUTH_UNLINK_FACEBOOK,
      payload: res.data,
    });
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/users/secret");

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret,
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};

// to check Authentication
export const checkAuth = () => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:5000/users/status");

      dispatch({
        type: AUTH_SIGN_IN,
      });

      console.log("user is auth-ed");
    } catch (err) {
      console.log("error", err);
    }
  };
};

export const getDashboard = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/users/dashboard");

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data,
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
