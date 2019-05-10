import React, { Component } from 'react';
import { View, Text } from 'react-native';

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

export default class WelcomeScreen extends Component {
  navigateToAuth = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    return <Slides data={SLIDES_DATA} authScreen={this.navigateToAuth} />;
  }
}
