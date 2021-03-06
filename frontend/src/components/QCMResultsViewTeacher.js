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
  resultsBox: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  '@media (max-width: 600px)': {
    resultsBox: {
      marginLeft: 0,
    }
  },
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
        this.props.question.answer1,
        this.props.question.answer2,
        this.props.question.answer3,
        this.props.question.answer4,
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
          if (curVal.answer === 'answer1') return [acc[0] += 1, acc[1], acc[2], acc[3]];
          else if (curVal.answer === 'answer2') return [acc[0], acc[1] += 1, acc[2], acc[3]];
          else if (curVal.answer === 'answer3') return [acc[0], acc[1], acc[2] += 1, acc[3]];
          else if (curVal.answer === 'answer4') return [acc[0], acc[1], acc[2], acc[3] += 1];
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

        <Paper className={this.props.classes.resultsBox + ' ' + this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
            <Typography variant="headline">
              Résultats de la question
            </Typography>
          </div>

          <div className={this.props.classes.spaceMe}>
            <Typography variant="subheading">
              {this.props.question.question}
            </Typography>
          </div>

          <Bar data={this.state.data} options={chartOptions} />

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
