import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, withStyles} from 'material-ui';

import StatusViewStudent from './StatusViewStudent';
import StatusViewTeacher from './StatusViewTeacher';


const styles = {
  toggleBar: {
    textAlign: 'right',
    padding: '8px',
  },
  centerMe: {
    textAlign: 'center',
  },
  paddingMain: {
    paddingTop: 25,
  },
};

const student = {
  status: "neutral",
    _id: "5a9e87bc26ef108e1d654704",
  name: "Lucas",
  role: "student",
  __v: 0
};

const teacher = {
  status: "lost",
    _id: "5a9e9d3b515bd2963a2a4c28",
  name: "Alex",
  role: "teacher",
  __v: 0
};

class Content extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    // Default user is set to student
    this.setState({
      user: student,
    });
  }

  handleSwitchChange = () => {
    this.setState(prevState => ({
      user: prevState.user._id === student._id ? teacher : student,
    }));
    console.log(this.state.user);
  };

  render() {
    return (
      <div>
        {/*<ToggleBar/>*/}
        <div className={this.props.classes.centerMe}>

          <div className={this.props.classes.toggleBar}>
            <span>{this.state.user.role === 'teacher' ? 'Vue Professeur' : 'Vue élève'}</span>
            <Switch
              checked={this.state.user.role === 'teacher'}
              onChange={this.handleSwitchChange}
            />
          </div>

          <div className={this.props.classes.paddingMain}>
            {this.state.user.role === 'teacher' ? <StatusViewTeacher user={this.state.user}/> : <StatusViewStudent user={this.state.user}/>}
          </div>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Content);
