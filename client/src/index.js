import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

import reducers from "./redux/reducers";

import authGuard from "./components/HOC/authGuard";
import axios from "axios";

// Localstorage
// const jwtToken = localStorage.getItem("JWT_TOKEN");
// axios.defaults.headers.common["Authorization"] = jwtToken;

axios.defaults.withCredentials = true;

// Beacuse http Only request we need to fire off on app load to the BackEnd to check if user is authenticated

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        // auth: {
        //   token: jwtToken,
        //   isAuthenticated: jwtToken ? true : false,
        // },
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App />
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={authGuard(Dashboard)} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
