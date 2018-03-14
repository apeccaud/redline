import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import request from 'superagent';
import PropTypes from 'prop-types';

import config from '../config';


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
  }

  async getTotalStatus() {
    return request.get(`${config.remote.host}/api/users/status`)
      .then(res => {
        this.setState({
          totalStatus: res.body
        });
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  onPressResetButton = () => {
    return request.get(`${config.remote.host}/api/users/resetAllStatus`)
      .then(res => {
        this.setState({
          totalStatus: res.body
        });
      })
      .catch(err => {
        console.error(err.message);
      });
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
