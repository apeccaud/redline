import React, {PureComponent} from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui';
import request from 'superagent';

import config from '../config';


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

  componentDidMount() {
    this.getTotalStatus();
  }

  async getTotalStatus() {
    return request.get(`${config.remote.host}/api/users/status`)
      .then(res => {
        this.setState({
          totalStatus: res.body
        });
        console.log(res.body);
      })
      .catch(err => {
        console.error(err.message);
      });
  }

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
