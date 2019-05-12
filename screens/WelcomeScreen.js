import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
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

    if (token) {
      this.setState({ token });
      const { navigation } = this.props;
      return navigation.navigate('map');
    }

    return this.setState({ token: false });
    
  }

  navigateToAuth = () => {
    const { navigation } = this.props;
    navigation.navigate('auth');
  };

  loading() {
    const { token } = this.state;
    if (token === '') return <AppLoading />;

    return <Slides data={SLIDES_DATA} authScreen={this.navigateToAuth} />;
  }

  render() {
    return this.loading();
  }
}

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(mapStateToProps)(WelcomeScreen);
