import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';
import { connect } from 'react-redux';

import StatusViewTeacher from './StatusViewTeacher';
import QCMCreateViewTeacher from './QCMCreateViewTeacher';
import QCMResultsViewTeacher from './QCMResultsViewTeacher';
import {findLastActive as findLastActiveRep} from "../repository/questions.repository";
import socket from '../services/sockets';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';


const styles = {
  mainBox: {
    display: 'flex',
    marginTop: 20,
  },
  spaceMe: {
    padding: 20,
  },
  dashboardBox: {
    padding: 20,
  }
};

class ViewTeacher extends PureComponent {

  state = {
    activeQuestion: null, // If a question is active store here
  };

  componentWillMount() {
    this.findLastActiveQuestion();
    socket.on('QUESTIONS_CHANGED', this.findLastActiveQuestion);
  }

  findLastActiveQuestion = () => {
    findLastActiveRep()
      .then(question => {
        this.setState({
          activeQuestion: question,
        })
      }).catch(e => console.error(e));
  };

  updateActiveQuestion = (question) => {
    this.setState({
      activeQuestion: question,
    })
  };

  closeActiveQuestion = () => {
    this.setState({
      activeQuestion: null,
    })
  };

  render() {
    return (
      <div className={this.props.classes.dashboardBox}>

        <Paper className={this.props.classes.spaceMe}>
          <Typography variant="headline">
            Bienvenue {this.props.user.firstname} {this.props.user.lastname}
          </Typography>
        </Paper>

        <div className={this.props.classes.mainBox}>
          <StatusViewTeacher />

          {this.state.activeQuestion ?
            <QCMResultsViewTeacher question={this.state.activeQuestion} closeActiveQuestion={this.closeActiveQuestion}/>
          :
            <QCMCreateViewTeacher updateActiveQuestion={this.updateActiveQuestion}/>
          }
        </div>

      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user })
)(withStyles(styles)(ViewTeacher));
