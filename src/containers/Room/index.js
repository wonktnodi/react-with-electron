import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

@connect(
  store => ({}),
  dispatch => bindActionCreators({}, dispatch)
)
class Room extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1> Room pages </h1>
      </div>
    );
  }
}

export default Room;
