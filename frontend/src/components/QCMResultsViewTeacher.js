import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


const styles = {
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
  },
  flexOne: {
    flex: 1,
  },
  resultsBox: {
    margin: 'auto',
    maxWidth: 800,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  createQuestionButton: {
    marginTop: 20,
  }
};

class QCMResultsViewTeacher extends PureComponent {

  closeQuestion = () => {
    // Deactivate question in backend
    this.props.closeActiveQuestion();
  };

  render() {

    return (
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe + ' ' + this.props.classes.flexOne}>

        <Paper className={this.props.classes.resultsBox}>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
            <Typography variant="headline">
              Résultats de la question
            </Typography>
          </div>

          <div>
            <Button
              variant="raised"
              color="primary"
              size="large"
              className={this.props.classes.createQuestionButton}
              onClick={this.closeQuestion}>
              Terminer la question
            </Button>
          </div>

        </Paper>

      </div>
    )
  }
}

export default withStyles(styles)(QCMResultsViewTeacher);
