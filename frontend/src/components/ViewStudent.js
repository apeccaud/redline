import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';
import { connect } from 'react-redux';

import StatusViewStudent from './StatusViewStudent';
import QCMViewStudent from './QCMViewStudent';
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

class ViewStudent extends PureComponent {

  render() {
    return (
      <div className={this.props.classes.dashboardBox}>

        <Paper className={this.props.classes.spaceMe}>
          <Typography variant="headline">
            Bienvenue {this.props.user.name}
          </Typography>
        </Paper>

        <div className={this.props.classes.mainBox}>
          <StatusViewStudent />

          <QCMViewStudent />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user })
)(withStyles(styles)(ViewStudent));
