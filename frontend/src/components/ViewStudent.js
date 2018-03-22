import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';

import StatusViewStudent from './StatusViewStudent';
import QCMViewStudent from './QCMViewStudent';


const styles = {
  mainBox: {
    display: 'flex',
  }
};

class ViewStudent extends PureComponent {

  render() {
    return (
      <div className={this.props.classes.mainBox}>

        <StatusViewStudent />

        <QCMViewStudent/>

      </div>
    )
  }
}

export default withStyles(styles)(ViewStudent);
