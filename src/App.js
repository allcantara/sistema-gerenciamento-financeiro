import React from "react";
import { SnackbarProvider } from "notistack";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

const browserHistory = createBrowserHistory();

export default () => (
  <SnackbarProvider
    maxSnack={2}
    autoHideDuration={2000}
    dense={false}
    preventDuplicate={true}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </SnackbarProvider>
);
