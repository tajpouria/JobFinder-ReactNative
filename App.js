import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';

class App extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}

const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
    deck: DeckScreen,
    map: MapScreen,
    review: createStackNavigator({
      review: ReviewScreen,
      setting: SettingScreen
    })
  })
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default createAppContainer(TabNavigator);
