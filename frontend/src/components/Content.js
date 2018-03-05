import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Typography} from 'material-ui';

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div className={this.props.className}>
        <Typography variant="headline">Bienvenue sur Redline !</Typography>
        <Typography variant="subheading">Coming soon...</Typography>
      </div>
    )
  }
}

export default Content;
