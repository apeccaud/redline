import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import socket from '../services/sockets';
import { resetAllStatus as resetAllStatusRep, getTotalStatus as getTotalStatusRep } from "../repository/users.repository";


const styles = {
  mainNumber: {
    fontSize: 75
  },
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
  },
  statusBox: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  '@media (max-width: 600px)': {
    statusBox: {
      marginRight: 0,
      marginBottom: 20,
    }
  },
};

class StatusViewTeacher extends PureComponent {
  state = {
    totalStatus: [],
  };

  componentDidMount() {
    this.getTotalStatus();
    socket.on('STATUS_CHANGED', this.getTotalStatus);
  }

  componentWillUnmount() {
    socket.removeListener('STATUS_CHANGED', this.getTotalStatus);
  }

  getTotalStatus = async() => {
    return getTotalStatusRep()
      .then(status => {
        this.setState({
          totalStatus: status
        });
      })
      .catch(err => console.log(err));
  };

  onPressResetButton = async() => {
    return resetAllStatusRep()
      .then(() => {
        this.setState({
          totalStatus: []
        });
      })
      .catch(err => console.log(err));
  };

  getSumLostStatus = () => {
    return this.state.totalStatus.reduce((acc, curVal) => {
      return acc + (curVal === 'lost' ? 1 : 0);
    }, 0)
  };

  render() {
    return (

      <Paper className={this.props.classes.statusBox + ' ' + this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

        <div className={this.props.classes.spaceMe}>
          <span className={this.props.classes.mainNumber}>
            {this.getSumLostStatus()}
          </span>
          <Typography variant="subheading">
            <span>Élèves n'arrivent plus à suivre votre cours</span>
          </Typography>
        </div>

        <div className={this.props.classes.spaceMe}>
          <Button
            variant="raised"
            color="primary"
            className={this.props.classes.resetButton}
            onClick={this.onPressResetButton}>
            Remettre à zero
          </Button>
        </div>

      </Paper>
    )
  }
}

export default withStyles(styles)(StatusViewTeacher);
