import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';

import StatusViewStudent from './StatusViewStudent';
import QCMViewStudent from './QCMViewStudent';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = {
  mainBox: {
    display: 'flex',
    marginTop: 20,
  },
  '@media (max-width: 600px)': {
    mainBox: {
      flexDirection: 'column'
    }
  },
  spaceMe: {
    padding: 20,
  },
  dashboardBox: {
    padding: 20,
    maxWidth: 1000,
    margin: 'auto',
  }
};

class ViewStudent extends PureComponent {

  render() {
    return (
      <div className={this.props.classes.dashboardBox}>

        <Paper className={this.props.classes.spaceMe}>
          <Typography variant="headline">
            Bienvenue PeccoLeBlaireau
          </Typography>
        </Paper>

        <div className={this.props.classes.mainBox}>
          <StatusViewStudent />

          <QCMViewStudent/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ViewStudent);
