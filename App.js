import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import { MapScreen, DeckScreen, ReviewScreen, SettingScreen } from './screens';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';

import store from './store';

const TabNavigator = createBottomTabNavigator(
  {
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
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false
    }
  }
);

let Navigation = createAppContainer(TabNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
