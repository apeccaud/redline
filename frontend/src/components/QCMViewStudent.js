import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { findLastActive as findLastActiveRep } from '../repository/questions.repository';
import socket from '../services/sockets';
import { submitResponse as submitResponseRep } from '../repository/questions.repository';

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
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  '@media (max-width: 600px)': {
    questionBox: {
      marginLeft: 0,
    }
  },
};

class QCMViewStudent extends PureComponent {

  state = {
    question: null,
    selectedAnswer: null,
  };

  componentDidMount() {
    this.findLastActiveQuestion();
    socket.on('QUESTIONS_CHANGED', this.findLastActiveQuestion);
  }

  findLastActiveQuestion = () => {
    findLastActiveRep()
      .then(question => {
        this.setState({
          question: question
        })
      }).catch(e => console.error(e));
  };

  submitResponse = (response) => {
    this.setState({selectedAnswer: response});
    submitResponseRep(this.state.question._id, response)
      .catch(err => console.error(err))
  };

  noQuestionView() {
    return (
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
        <Typography variant="headline">
          Il n'y a pas de question pour le moment
        </Typography>
      </div>
    )
  };

  questionView() {
    return (
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
            <Typography variant="headline">
              {this.state.question.question}
            </Typography>
          </div>

          <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

            <div className={this.props.classes.flexButtons}>
              <Button
                variant="raised"
                color={this.state.selectedAnswer ==='answer1' ? "secondary" : "primary"}
                size="large"
                className={this.props.classes.answerButton}
                onClick={() => this.submitResponse('answer1')}>
                {this.state.question.answer1}
              </Button>
              <Button
                variant="raised"
                color={this.state.selectedAnswer ==='answer2' ? "secondary" : "primary"}
                size="large"
                className={this.props.classes.answerButton}
                onClick={() => this.submitResponse('answer2')}>
                {this.state.question.answer2}
              </Button>
              <Button
                variant="raised"
                color={this.state.selectedAnswer ==='answer3' ? "secondary" : "primary"}
                size="large"
                className={this.props.classes.answerButton}
                onClick={() => this.submitResponse('answer3')}>
                {this.state.question.answer3}
              </Button>
              <Button
                variant="raised"
                color={this.state.selectedAnswer ==='answer4' ? "secondary" : "primary"}
                size="large"
                className={this.props.classes.answerButton}
                onClick={() => this.submitResponse('answer4')}>
                {this.state.question.answer4}
              </Button>
            </div>

          </div>

      </div>
    )
  };

  render() {
    return (
      <Paper className={this.props.classes.questionBox + ' ' + this.props.classes.spaceMe}>
        {this.state.question ? this.questionView() : this.noQuestionView()}
      </Paper>
    )
  }
}

export default withStyles(styles)(QCMViewStudent);
