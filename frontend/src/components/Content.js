import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Typography, Switch, AppBar} from 'material-ui';

class ToggleBar extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    state = {
        checked: true
    };

    handleChange = (event, value) => {
        this.setState({checked: value});
    };

    render() {
        return (
            <AppBar position="static">
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    fullWidth
                />
            </AppBar>
        );
    }
}

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
        <div>
            <ToggleBar/>
            <i class="material-icons">add_alert</i>
            <div className={this.props.className}>
            <Typography variant="headline">Bienvenue sur Redline !</Typography>
            <Typography variant="subheading">Coming soon...</Typography>
            </div>
        </div>
    )
  }
}

export default Content;
