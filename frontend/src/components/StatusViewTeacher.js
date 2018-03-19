import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

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
  }
};

class StatusViewTeacher extends PureComponent {
  state = {
    totalStatus: [],
  };

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

        <div className={this.props.classes.spaceMe}>
          <Typography variant="headline">
            Bienvenue {this.props.user.name}
          </Typography>
        </div>

        <div className={this.props.classes.spaceMe}>
                    <span className={this.props.classes.mainNumber}>
                        {this.state.totalStatus.reduce((acc, curVal) => {
                          return acc + (curVal === 'lost' ? 1 : 0);
                        }, 0)}
                    </span>
          <Typography
            variant="subheading">
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

      </div>
    )
  }
}

export default withStyles(styles)(StatusViewTeacher);
