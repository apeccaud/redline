import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
  },
  answerButton: {
    margin: 10,
  },
  flexButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  questionBox: {
    margin: 'auto',
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    maxWidth: 800,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};

class QCMViewStudent extends PureComponent {

  render() {

    return (
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

        <div className={this.props.classes.questionBox}>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
            <Typography variant="headline">
              Quelle est la couleur du cheval blanc d'Henry IV ?
            </Typography>
          </div>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

            <div className={this.props.classes.flexButtons}>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                Blanc
              </Button>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed augue iaculis, condimentum odio ac, scelerisque lacus
              </Button>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                Gris
              </Button>
              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.answerButton}>
                Blue
              </Button>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default withStyles(styles)(QCMViewStudent);
