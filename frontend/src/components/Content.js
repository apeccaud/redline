import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui';
import { connect } from 'react-redux';

import ViewStudent from './ViewStudent';
import StatusViewTeacher from './StatusViewTeacher';


const styles = {
  toggleBar: {
    textAlign: 'right',
    padding: '8px',
  },
  centerMe: {
    textAlign: 'center',
  },
};

class Content extends PureComponent {
  getView = () => {
    if (this.props.user.role === 'teacher') {
      return <StatusViewTeacher />
    }
    else if (this.props.user.role === 'student') {
      return <ViewStudent />
    }
    else {
      return <div>Veuillez vous connecter</div>
    }
  };

  render() {
    return (
      <div>
        <div className={this.props.classes.centerMe}>

          <div className={this.props.classes.paddingMain}>
            {this.getView()}
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user })
)(withStyles(styles)(Content));
