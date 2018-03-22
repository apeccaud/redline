import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';

import StatusViewTeacher from './StatusViewTeacher';
import QCMCreateViewTeacher from './QCMCreateViewTeacher';
import QCMResultsViewTeacher from './QCMResultsViewTeacher';
import {findLastActive as findLastActiveRep} from "../repository/questions.repository";


const styles = {
  mainBox: {
    display: 'flex',
  }
};

class ViewTeacher extends PureComponent {

  state = {
    activeQuestion: null, // If a question is active store here
  };

  componentWillMount() {
    this.findLastActiveQuestion();
    // TODO Websockets
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
      <div className={this.props.classes.mainBox}>

        <StatusViewTeacher />

        {this.state.activeQuestion ?
          <QCMResultsViewTeacher question={this.state.activeQuestion} closeActiveQuestion={this.closeActiveQuestion}/>
        :
          <QCMCreateViewTeacher updateActiveQuestion={this.updateActiveQuestion}/>
        }

      </div>
    )
  }
}

export default withStyles(styles)(ViewTeacher);
