import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) return this.props.navigation.navigate('map');
  }

  render() {
    return <AppLoading />;
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
