import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, withStyles} from 'material-ui';
import request from 'superagent';

import StatusViewStudent from './StatusViewStudent';
import StatusViewTeacher from './StatusViewTeacher';
import config from '../config';
import socket from "../services/sockets";


const styles = {
  toggleBar: {
    textAlign: 'right',
    padding: '8px',
  },
  centerMe: {
    textAlign: 'center',
  },
  paddingMain: {
    paddingTop: 25,
  },
};

const STUDENTID = '5a9e87bc26ef108e1d654704';

const TEACHERID = '5a9e9d3b515bd2963a2a4c28';

class Content extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    // Default user is set to student
    this.getUser('student');
    socket.on('STATUS_CHANGED', () => {
      this.updateUser();
    });
  }

  async getUser(role) {
    if (['teacher', 'student'].indexOf(role) === -1) return console.error('Impossible to fetch user');

    return request.get(`${config.remote.host}/api/users/${role === 'teacher' ? TEACHERID : STUDENTID}`)
      .then(res => {
        this.setState({
          user: res.body
        });
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  async updateUser() {
    return request.get(`${config.remote.host}/api/users/${this.state.user._id}`)
      .then(res => {
        this.setState({
          user: res.body
        });
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  handleSwitchChange = () => {
    this.getUser(this.state.user.role === 'teacher' ? 'student' : 'teacher');
  };

  changeStatus = (status) => {
    let user = this.state.user;
    this.setState({
      user: { ...user, status },
    }, this.saveUserStatus);
  };

  async saveUserStatus() {
    request.put(`${config.remote.host}/api/users/${this.state.user._id}/changeStatus`)
      .send({ status: this.state.user.status })
      .catch(err => console.error(err.message));
  };

  render() {
    return (
      <div>
        {/*<ToggleBar/>*/}
        <div className={this.props.classes.centerMe}>

          <div className={this.props.classes.toggleBar}>
            <span>{this.state.user.role === 'teacher' ? 'Vue Professeur' : 'Vue élève'}</span>
            <Switch
              checked={this.state.user.role === 'teacher'}
              onChange={this.handleSwitchChange}
            />
          </div>

          <div className={this.props.classes.paddingMain}>
            {
              this.state.user.role === 'teacher' ?
                <StatusViewTeacher user={this.state.user}/>
              :
                <StatusViewStudent user={this.state.user} onClickButton={this.changeStatus}/>
            }
          </div>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Content);
