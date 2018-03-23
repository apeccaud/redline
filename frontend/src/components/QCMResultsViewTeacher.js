import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Bar} from 'react-chartjs-2';

import { deactivate as deactivateQuestionRep } from '../repository/questions.repository';


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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  createQuestionButton: {
    marginTop: 20,
    marginBottom: 20,
  }
};

class QCMResultsViewTeacher extends PureComponent {

  state = {
    data: {
      labels: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"],
      datasets: [{
        label: "Réponses",
        backgroundColor: 'rgb(255,120,0)',
        data: [10, 5, 2, 20],
      }]
    }
  };

  // TODO Proptypes

  closeQuestion = () => {
    deactivateQuestionRep(this.props.question._id)
      .catch(err => console.log(err));
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

          <Bar data={this.state.data} options={{legend: { display: false, },}} />

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
