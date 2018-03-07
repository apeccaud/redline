import React, {PureComponent} from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui';


const styles = {
  mainNumber: {
    fontSize: 75,
    margin: 20,
  },
  centerMe: {
    textAlign: 'center',
  },
  resetButton: {
    margin: 10,
  },
};

class StatusViewTeacher extends PureComponent {
  render() {
    return (
      <div className={this.props.classes.centerMe}>

        <div className={this.props.classes.centerMe}>
          Bienvenue {this.props.user.name}
        </div>

        <div className={this.props.classes.mainNumber}>
          5
        </div>

        <div>
          Élèves n'arrivent plus à suivre votre cours
        </div>

        <Button
          variant="flat"
          color="primary"
          className={this.props.classes.resetButton}
          onClick={this.onPressResetButton}>
          Remettre à zero
        </Button>

      </div>
    )
  }
}

export default withStyles(styles)(StatusViewTeacher);
