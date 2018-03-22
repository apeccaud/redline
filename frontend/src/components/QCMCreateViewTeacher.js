import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import { Clear as WrongIcon, Done as RightIcon } from 'material-ui-icons';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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
                  id="question"
                  type="text"
                  multiline={true}
                  rowsMax="3"
                  autoFocus={true}
                  className={this.props.classes.questionInput}
                />
              </FormControl>

              <FormControl className={this.props.classes.answerInputForm}>
                <RightIcon/>
                <Input
                  id="right-answer"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Bonne réponse"
                />
              </FormControl>
              <Divider />
              <FormControl className={this.props.classes.answerInputForm}>
                <WrongIcon/>
                <Input
                  id="wrong-answer"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Mauvaise réponse"
                />
              </FormControl>
              <Divider />
              <FormControl className={this.props.classes.answerInputForm}>
                <WrongIcon/>
                <Input
                  id="wrong-answer"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Mauvaise réponse"
                />
              </FormControl>
              <Divider />
              <FormControl className={this.props.classes.answerInputForm}>
                <WrongIcon/>
                <Input
                  id="wrong-answer"
                  type="text"
                  className={this.props.classes.answerInput}
                  disableUnderline={true}
                  placeholder="Mauvaise réponse"
                />
              </FormControl>

              <Button
                variant="raised"
                color="primary"
                size="large"
                className={this.props.classes.LaunchQuestionButton}>
                Lancer la question
              </Button>

            </form>
          </div>

        </Paper>

      </div>
    )
  }
}

export default withStyles(styles)(QCMCreateViewTeacher);
