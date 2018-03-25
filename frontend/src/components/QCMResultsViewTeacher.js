import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { deactivate as deactivateQuestionRep } from '../repository/questions.repository';
import { getResponses as getResponsesRep } from '../repository/questions.repository';
import socket from "../services/sockets";


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

const dataSet = {
  label: "Réponses des élèves",
  backgroundColor: 'rgb(255,120,0)',
  data: [0, 0, 0, 0],
};

const chartOptions = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        stepSize: 1
      }
    }]
  }
};

class QCMResultsViewTeacher extends PureComponent {

  static propTypes = {
    question: PropTypes.object.isRequired,
    closeActiveQuestion: PropTypes.func.isRequired
  };

  state = {
    data: {
      labels: [
        this.props.question.goodAnswer,
        this.props.question.badAnswer1,
        this.props.question.badAnswer2,
        this.props.question.badAnswer3,
      ],
      datasets: [dataSet]
    }
  };

  componentDidMount() {
    this.updateResponses();

    socket.on('RESPONSES_CHANGED', (params) => {
      if (params.question === this.props.question._id) {
        this.updateResponses();
      }
    });
  }

  updateResponses() {
    getResponsesRep(this.props.question._id)
      .then(responses => {
        return responses.reduce((acc, curVal) => {
          if (curVal.answer === 'goodAnswer') return [acc[0] += 1, acc[1], acc[2], acc[3]];
          else if (curVal.answer === 'badAnswer1') return [acc[0], acc[1] += 1, acc[2], acc[3]];
          else if (curVal.answer === 'badAnswer2') return [acc[0], acc[1], acc[2] += 1, acc[3]];
          else if (curVal.answer === 'badAnswer3') return [acc[0], acc[1], acc[2], acc[3] += 1];
          else return acc;
        }, [0, 0, 0, 0]);
      })
      .then(values => {
        this.setState(prevState => { return {
          data: {
            ...prevState,
            datasets: [
              { ...dataSet, data: [values[0], values[1], values[2], values[3]] }
            ]
          }
        }});
      })
      .catch(err => console.log(err));
  };

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

          <Bar data={this.state.data} options={chartOptions} />

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
