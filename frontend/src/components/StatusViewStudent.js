import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import {Typography} from 'material-ui';
import {Clear as StopIcon, Done as OkIcon, Info as InfoIcon} from 'material-ui-icons';

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
    stopButtonText: {
        marginTop: 20,
        fontSize:20
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
    }
};

class StatusViewStudent extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    onClickButton: PropTypes.func,
  };

  onPressButton = () => {
    // Change parent state (user)
    let newStatus = this.props.user.status === 'lost' ? 'neutral' : 'lost';
    this.props.onClickButton(newStatus);
  };

  render() {
    return (
        <div>

            <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
                <Typography variant="headline">
                    Bienvenue {this.props.user.name}
                </Typography>
            </div>

            <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
                <Button
                    variant="fab"
                    color={this.props.user.status === 'lost' ? 'primary' : 'secondary'}
                    style={styles.stopButton}
                    onClick={this.onPressButton}>
                    {this.props.user.status === 'lost' ? <OkIcon style={styles.stopIcon}/> :
                        <StopIcon style={styles.stopIcon}/>}
                </Button>
                <Typography
                    variant="button"
                    color={this.props.user.status === 'lost' ? 'primary' : 'secondary'}
                    className={this.props.classes.stopButtonText}>
                    {this.props.user.status === 'lost' ? <span>J'ai tout compris</span> :
                        <span>J'ai des difficultés</span>}
                </Typography>
            </div>

            <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
                <Typography
                    className={this.props.classes.infoText}
                    variant="subheading">
                    <InfoIcon style={styles.infoIcon}/>
                    Appuyer sur le bouton permet de notifer au professeur que vous avez du mal à suivre
                </Typography>
            </div>

        </div>
    )
  }
}

export default withStyles(styles)(StatusViewStudent);
