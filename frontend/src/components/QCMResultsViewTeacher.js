import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { deactivate as deactivateQuestionRep } from '../repository/questions.repository';


const styles = {
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
  },
  resultsBox: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  }
};

class QCMResultsViewTeacher extends PureComponent {

  closeQuestion = () => {
    deactivateQuestionRep(this.props.question._id)
      .catch(err => console.log(err));
    this.props.closeActiveQuestion();
  };

  render() {

    return (

        <Paper className={this.props.classes.resultsBox + ' ' + this.props.classes.centerMe}>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
            <Typography variant="headline">
              Résultats de la question
            </Typography>
          </div>

          <div className={this.props.classes.spaceMe}>
            <Button
              variant="raised"
              color="primary"
              onClick={this.closeQuestion}>
              Terminer la question
            </Button>
          </div>

        </Paper>

    )
  }
}

export default withStyles(styles)(QCMResultsViewTeacher);
