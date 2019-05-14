import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    const { facebookLogin } = this.props;
    facebookLogin();
  }

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    if (token) {
      const { navigation } = this.props;
      return navigation.navigate('auth');
    }
  }

  render() {
    return <AppLoading />;
  }
}

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
