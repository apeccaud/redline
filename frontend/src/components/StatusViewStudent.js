import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';


const styles = {
  stopButton: {
    padding: '14px',
    margin: '20px',
  },
  centerMe: {
    textAlign: 'center',
  },
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

        <div className={this.props.classes.centerMe}>
          Bienvenue {this.props.user.name}
        </div>

        <div className={this.props.classes.centerMe}>
          <Button
            variant='raised'
            color={this.props.user.status === 'lost' ? 'secondary' : 'primary'}
            className={this.props.classes.stopButton}
            onClick={this.onPressButton}>
            {this.props.user.status === 'lost' ? <span>J'ai tout compris</span> : <span>Ça devient compliqué</span>}
          </Button>
        </div>

        <div>
          Appuyer sur le bouton permet de notifer au professeur que vous avez du mal à suivre
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(StatusViewStudent);
