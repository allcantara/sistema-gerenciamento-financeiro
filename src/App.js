import React from "react";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

const browserHistory = createBrowserHistory();

export default () => (
  <Router history={browserHistory}>
    <Routes />
  </Router>
);
