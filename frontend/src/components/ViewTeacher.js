import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';

import StatusViewTeacher from './StatusViewTeacher';
import QCMCreateViewTeacher from './QCMCreateViewTeacher';
import QCMResultsViewTeacher from './QCMResultsViewTeacher';


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
    // Listen to websockets if active question is created
  }

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
          <QCMResultsViewTeacher closeActiveQuestion={this.closeActiveQuestion}/>
        :
          <QCMCreateViewTeacher updateActiveQuestion={this.updateActiveQuestion}/>
        }

      </div>
    )
  }
}

export default withStyles(styles)(ViewTeacher);
