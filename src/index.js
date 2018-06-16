import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./containers/Home";

function content() {
  return <Home />;
}

ReactDOM.render(content(), document.getElementById("root"));
