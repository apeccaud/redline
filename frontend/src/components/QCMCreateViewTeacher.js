import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import { Clear as WrongIcon, Done as RightIcon } from 'material-ui-icons';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { ToastContainer, toast } from 'react-toastify';

import { create as createQuestionRep } from '../repository/questions.repository';

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
  questionBox: {
    margin: 'auto',
    maxWidth: 800,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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

  state = {
    question: "",
    goodAnswer: "",
    badAnswer1: "",
    badAnswer2: "",
    badAnswer3: "",
  };

  createQuestion = () => {
    createQuestionRep(
      this.state.question,
      this.state.goodAnswer,
      this.state.badAnswer1,
      this.state.badAnswer2,
      this.state.badAnswer3
    ).catch(err => this.notifyError());
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
      <div className={this.props.classes.centerMe + ' ' + this.props.classes.spaceMe + ' ' + this.props.classes.flexOne}>

        <Paper className={this.props.classes.questionBox}>

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
                  name="goodAnswer"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Bonne réponse"
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <Divider />
              <FormControl className={this.props.classes.answerInputForm}>
                <WrongIcon/>
                <Input
                  name="badAnswer1"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Mauvaise réponse"
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <Divider />
              <FormControl className={this.props.classes.answerInputForm}>
                <WrongIcon/>
                <Input
                  name="badAnswer2"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Mauvaise réponse"
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <Divider />
              <FormControl className={this.props.classes.answerInputForm}>
                <WrongIcon/>
                <Input
                  name="badAnswer3"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Mauvaise réponse"
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.LaunchQuestionButton}
                onClick={this.createQuestion}>
                Lancer la question
              </Button>

            </form>
          </div>

          <ToastContainer />

        </Paper>

      </div>
    )
  }
}

export default withStyles(styles)(QCMCreateViewTeacher);
