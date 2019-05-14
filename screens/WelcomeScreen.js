import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';

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
      token: null
    };

    this.navigateToAuth = this.navigateToAuth.bind(this);
  }

  async componentDidMount() {
    const {
      navigation: { navigate }
    } = this.props;

    const token = await AsyncStorage.getItem('fb-token');
    navigate('map');
    if (token) {
      navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  navigateToAuth() {
    const {
      navigation: { navigate }
    } = this.props;
    return navigate('auth');
  }

  render() {
    const { token } = this.state;
    if (_.isNull(token)) {
      return <AppLoading />;
    }

    return <Slides data={SLIDES_DATA} authScreen={this.navigateToAuth} />;
  }
}

export default WelcomeScreen;
