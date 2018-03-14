import React, {PureComponent} from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui';
import PropTypes from 'prop-types';

import socket from '../services/sockets';
import { resetAllStatus as resetAllStatusRep, getTotalStatus as getTotalStatusRep } from "../repository/users.repository";


const styles = {
  mainNumber: {
    fontSize: 75,
    margin: 20,
  },
  centerMe: {
    textAlign: 'center',
  },
  resetButton: {
    margin: 10,
  },
};

class StatusViewTeacher extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalStatus: [],
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
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
      .then(status => {
        this.setState({
          totalStatus: status
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className={this.props.classes.centerMe}>

        <div className={this.props.classes.centerMe}>
          Bienvenue {this.props.user.name}
        </div>

        <div className={this.props.classes.mainNumber}>
          {this.state.totalStatus.reduce((acc, curVal) => {
            return acc + (curVal === 'lost' ? 1 : 0);
          }, 0)}
        </div>

        <div>
          Élèves n'arrivent plus à suivre votre cours
        </div>

        <Button
          variant="flat"
          color="primary"
          className={this.props.classes.resetButton}
          onClick={this.onPressResetButton}>
          Remettre à zero
        </Button>

      </div>
    )
  }
}

export default withStyles(styles)(StatusViewTeacher);
