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
    display: 'flex',
    justifyContent: 'center',
  }
};

class Content extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isTeacher: false,
    };
  }

  handleSwitchChange = () => {
    this.setState(prevState => ({
      isTeacher: !prevState.isTeacher
    }));
  };

  render() {
    return (
      <div>
        {/*<ToggleBar/>*/}
        <div className={this.props.className}>

          <div className={this.props.classes.toggleBar}>
            <span>{this.state.isTeacher ? 'Vue Professeur' : 'Vue élève'}</span>
            <Switch
              checked={this.state.isTeacher}
              onChange={this.handleSwitchChange}
            />
          </div>

          <div className={this.props.classes.centerMe}>
            {this.state.isTeacher ? <StatusViewTeacher/> : <StatusViewStudent/>}
          </div>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Content);
