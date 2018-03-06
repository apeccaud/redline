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
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonIsPressed: false,
    };
  }

  onPressButton = () => {
    this.setState(prevState => ({
      buttonIsPressed: !prevState.buttonIsPressed,
    }));
  };

  render() {
    return (
      <div>

        <div className={this.props.classes.centerMe}>
          <Button
            variant="raised"
            color={this.state.buttonIsPressed ?"secondary" : "primary"}
            className={this.props.classes.stopButton}
            onClick={this.onPressButton}>
            {this.state.buttonIsPressed ? <span>En faite ça va</span> : <span>Ça devient compliqué</span>}
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
