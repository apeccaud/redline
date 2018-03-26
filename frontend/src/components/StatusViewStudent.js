import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import { Clear as StopIcon, Done as OkIcon, Info as InfoIcon } from 'material-ui-icons';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import { saveUserStatus as saveUserStatusRep } from "../repository/users.repository";
import { saveStatus } from '../redux/user/actionCreators';

const styles = {
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
  },
  stopButton: {
    width: 150,
    height: 150,
    padding: 30
  },
  statusText: {
    marginTop: 40
  },
  statusLabelText: {
    display: 'inline-block',
    color: '#9c9c9c'
  },
  statusActualText: {
    fontSize: 20,
    paddingLeft: 5,
    display: 'inline-block'
  },
  stopIcon: {
    width: 60,
    height: 60,
  },
  infoText: {
    color: '#9c9c9c'
  },
  infoIcon: {
    width: 24,
    height: 24,
    verticalAlign: 'bottom',
    paddingRight: 5
  },
  statusBox: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  '@media (max-width: 600px)': {
    statusBox: {
      marginRight: 0,
      marginBottom: 20,
    }
  },
};

class StatusViewStudent extends PureComponent {
  changeStatus = () => {
    let newStatus = this.props.user.status === 'lost' ? 'neutral' : 'lost';
    this.props.saveStatus(newStatus);
    saveUserStatusRep(this.props.user._id, newStatus)
      .catch(err => console.error(err.message));
  };

  render() {
    return (
      <Paper className={this.props.classes.statusBox + ' ' + this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

        <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
          <Tooltip
            title={this.props.user.status === 'lost' ? 'J\'ai tout compris' :
              'J\'ai des difficultés'}
            placement="right">
            <Button
              variant="fab"
              color={this.props.user.status === 'lost' ? 'primary' : 'secondary'}
              style={styles.stopButton}
              onClick={this.changeStatus}>
              {this.props.user.status === 'lost' ? <OkIcon style={styles.stopIcon}/> :
                <StopIcon style={styles.stopIcon}/>}
            </Button>
          </Tooltip>
          <div className={this.props.classes.statusText}>
            <Typography
              className={this.props.classes.statusLabelText}
              variant="subheading">
              Statut actuel :
            </Typography>
            <Typography
              variant="button"
              color={this.props.user.status === 'lost' ? 'secondary' : 'primary'}
              className={this.props.classes.statusActualText}>
              {this.props.user.status === 'lost' ? <span>J'ai des difficultés</span> :
                <span>J'arrive à suivre</span>}
            </Typography>
          </div>
        </div>

        <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
          <Typography
            className={this.props.classes.infoText}
            variant="subheading">
            <InfoIcon style={styles.infoIcon}/>
            Appuyer sur le bouton permet de notifer au professeur que vous avez du mal à suivre ou non
          </Typography>
        </div>

      </Paper>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  dispatch => ({ saveStatus: status => dispatch(saveStatus(status)) })
)(withStyles(styles)(StatusViewStudent));
