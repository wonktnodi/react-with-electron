import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AppBar, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

@withStyles(styles, { withTheme: true })
@connect(
  // store => ({}),
  () => ({}),
  dispatch => bindActionCreators({}, dispatch)
)
class Room extends Component {
  state = {};

  renderTestContent = () => (
    <Toolbar>
      <TextField hintText="Folder Path" />
      <Button variant="raised">Browse</Button>
    </Toolbar>
  );

  renderAppBar = () => {
    const { classes } = this.props;
    return (
      <AppBar elevation={1} position="static" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Moshi Code
          </Typography>
          <Button color="inherit">Helps</Button>
        </Toolbar>
      </AppBar>
    );
  };
  render() {
    return <div>{this.renderAppBar()}</div>;
  }
}

export default Room;
