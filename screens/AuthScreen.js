import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: ''
    };
  }

  componentDidMount() {
    const { facebookLogin } = this.props;
    facebookLogin();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: nextProps.token });
  }

  navigateToMapScreen(token) {
    if (this.state.token) return this.props.navigation.navigate('map');
    return <AppLoading />;
  }

  render() {
    return this.navigateToMapScreen(this.props.token);
  }
}

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
