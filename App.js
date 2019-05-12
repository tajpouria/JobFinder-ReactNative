import React from 'react';
import { Provider } from 'react-redux';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';
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

const Navigation = createAppContainer(TabNavigator);

export default () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
