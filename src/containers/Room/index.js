import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Toolbar from "@material-ui/core/Toolbar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

@withStyles(styles, { withTheme: true })
@connect(
  store => ({}),
  dispatch => bindActionCreators({}, dispatch)
)
class Room extends Component {
  state = {};
  render() {
    return (
      <div>
        <Toolbar>
            <TextField hintText="Folder Path" />
            <Button variant="raised">Browse</Button>
        </Toolbar>
      </div>
    );
  }
}

export default Room;
