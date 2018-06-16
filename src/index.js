import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import adapter from "webrtc-adapter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import configureStore from "./stores/configureStore";

import "./index.css";

import Home from "./containers/Home";
import Room from "./containers/Room";

const theme = createMuiTheme();

if (window) {
  window.adapter = adapter;
}

const store = configureStore();

function content() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Room} />
            <Route exact path="/rooms" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

ReactDOM.render(content(), document.getElementById("root"));
