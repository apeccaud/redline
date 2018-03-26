import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import { Done as RightIcon } from 'material-ui-icons';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { create as createQuestionRep } from '../repository/questions.repository';

const styles = {
  centerMe: {
    textAlign: 'center',
  },
  spaceMe: {
    padding: 20
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
  answerInputForm: {
    padding: '5px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  answerInput: {
    marginLeft: 10,
    flex: 1,
  },
  questionLabelText: {
    marginBottom: 10,
  },
  questionInput: {
    border: '1px solid lightgrey',
    paddingLeft: 10,
    marginBottom: 10,
  },
  LaunchQuestionButton: {
    marginTop: 20,
  }
};

class QCMCreateViewTeacher extends PureComponent {

  static propTypes = {
    updateActiveQuestion: PropTypes.func.isRequired
  };

  state = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  };

  createQuestion = () => {
    createQuestionRep(
      this.state.question,
      this.state.answer1,
      this.state.answer2,
      this.state.answer3,
      this.state.answer4)
      .then(question => this.props.updateActiveQuestion(question))
      .catch(this.notifyError);
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  notifyError = () => toast.error("Veuillez renseigner tous les champs");

  render() {

    return (

     <Paper className={this.props.classes.questionBox + ' ' + this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>

        <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
          <Typography variant="headline">
            Créer une question
          </Typography>
        </div>

        <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe}>
          <form noValidate autoComplete="off">

            <FormControl fullWidth>
              <Typography
                className={this.props.classes.questionLabelText}
                variant="subheading"
                align="left">
                Intitulé de la question
              </Typography>
              <Input
                name="question"
                type="text"
                multiline={true}
                rowsMax="3"
                autoFocus={true}
                className={this.props.classes.questionInput}
                onChange={this.handleInputChange}
              />
            </FormControl>

            <FormControl className={this.props.classes.answerInputForm}>
              <RightIcon/>
              <Input
                name="answer1"
                type="text"
                className={this.props.classes.answerInput}
                disableUnderline={true}
                placeholder="Réponse 1"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <Divider />
            <FormControl className={this.props.classes.answerInputForm}>
              <RightIcon/>
              <Input
                name="answer2"
                type="text"
                className={this.props.classes.answerInput}
                disableUnderline={true}
                placeholder="Réponse 2"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <Divider />
            <FormControl className={this.props.classes.answerInputForm}>
              <RightIcon/>
              <Input
                name="answer3"
                type="text"
                className={this.props.classes.answerInput}
                disableUnderline={true}
                placeholder="Réponse 3"
                onChange={this.handleInputChange}
              />
            </FormControl>
            <Divider />
            <FormControl className={this.props.classes.answerInputForm}>
              <RightIcon/>
              <Input
                name="answer4"
                type="text"
                className={this.props.classes.answerInput}
                disableUnderline={true}
                placeholder="Réponse 4"
                onChange={this.handleInputChange}
              />
            </FormControl>

            <Button
              variant="raised"
              color="primary"
              className={this.props.classes.LaunchQuestionButton}
              onClick={this.createQuestion}>
              Lancer la question
            </Button>

          </form>
        </div>

        <ToastContainer />

     </Paper>
    )
  }
}

export default withStyles(styles)(QCMCreateViewTeacher);
