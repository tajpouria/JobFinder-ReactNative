import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const SLIDES_DATA = [
  {
    id: 1,
    text: 'JobFinder helps you finding local job \n Swipe right for more →',
    color: 'rgb(191,63,161)'
  },
  {
    id: 2,
    text: "Let's set your location and start journey!",
    color: 'rgb(50,133,91)'
  }
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('fb-token');

    if (token) this.props.navigation.navigate('map');
    this.setState({ token: false });
  }

  navigateToAuth() {
    this.props.navigation.navigate('auth');
  }

  loading() {
    if (this.state.token === '') return <AppLoading />;
    else if (this.state.token === false)
      return (
        <Slides
          data={SLIDES_DATA}
          authScreen={this.navigateToAuth.bind(this)}
        />
      );
  }

  render() {
    return this.loading();
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps)(WelcomeScreen);
