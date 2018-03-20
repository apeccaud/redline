import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';

import StatusViewStudent from './StatusViewStudent';
import StatusViewTeacher from './StatusViewTeacher';
import socket from '../services/sockets';
import { getUser as getUserRep } from '../repository/users.repository';


const styles = {
  toggleBar: {
    textAlign: 'right',
    padding: '8px',
  },
  centerMe: {
    textAlign: 'center',
  },
};

class Content extends PureComponent {
  state = {
    user: {},
  };

  componentDidMount() {
    this.getJWTFromUrl();
    this.getUser(); // Get or redirect
    socket.on('STATUS_CHANGED', () => {
      this.getUser();
    });
  }

  getJWTFromUrl() {
    const url = new URL(document.location.href);
    const jwt = url.searchParams.get("token");
    if (jwt) {
      // Process JWT
      localStorage.setItem('token', jwt);
    }
  }

  getUser() {
    return getUserRep()
      .then(user => {
        this.setState({
          user: user
        });
      })
      .catch(err => console.error(err.message));
  }

  getView = () => {
    if (this.state.user.role === 'teacher') {
      return <StatusViewTeacher user={this.state.user}/>
    }
    else if (this.state.user.role === 'student') {
      return <StatusViewStudent />
    }
    else {
      return <div>Veuillez vous connecter</div>
    }
  };

  render() {
    return (
      <div>
        <div className={this.props.classes.centerMe}>

          <div className={this.props.classes.paddingMain}>
            {this.getView()}
          </div>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Content);
