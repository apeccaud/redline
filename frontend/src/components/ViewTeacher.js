import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';

import StatusViewTeacher from './StatusViewTeacher';
import QCMCreateViewTeacher from './QCMCreateViewTeacher';


const styles = {
  mainBox: {
    display: 'flex',
  }
};

class ViewTeacher extends PureComponent {

  render() {
    return (
      <div className={this.props.classes.mainBox}>

        <StatusViewTeacher />

        <QCMCreateViewTeacher/>

      </div>
    )
  }
}

export default withStyles(styles)(ViewTeacher);
