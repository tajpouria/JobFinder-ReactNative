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
    let token = await AsyncStorage.getItem('fb-token');
    this.props.navigation.navigate('map');
    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  navigateToAuth() {
    const { navigate } = this.props.navigation;
    return navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return <Slides data={SLIDES_DATA} authScreen={this.navigateToAuth} />;
  }
}

export default WelcomeScreen;
