import React, {Component} from 'react';
import {MuiThemeProvider, Reboot, withStyles} from 'material-ui';
import PropTypes from 'prop-types';
import request from 'superagent';

import './App.css';
import theme from '../theme';
import GlobalAppBar from './GlobalAppBar';
import Content from './Content';
import config from '../config';

const styles = {
  root: {
    marginTop: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      marginTop: 48
    },
    '@media (min-width:600px)': {
      marginTop: 64
    }
  },
};

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  // Will be replace by a getOrCreateUser function once we connect the app to LinkApp
  createUser = () => {
    request.post(`${config.remote.host}/api/users`)
      .send({ name: 'whatever', role: 'student' })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err.message);
      })
  };

  componentDidMount() {
    this.createUser();
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <MuiThemeProvider theme={theme}>
          <Reboot/>
          <GlobalAppBar appTitle="Redline"/>
          {/* You should work mainly in the Content component */}
          <Content/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
