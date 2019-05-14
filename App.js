import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from 'expo';
import { Alert } from 'react-native';

import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import registerForPushNotifications from './services/pushNotifications';
import { store, persistor } from './store';

const TabNavigator = createBottomTabNavigator(
  {
    welcome: WelcomeScreen,
    auth: AuthScreen,
    main: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      review: createStackNavigator(
        {
          review: ReviewScreen,
          setting: SettingScreen
        },
        {
          navigationOptions: {
            tabBarLabel: 'Liked',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="favorite" color={tintColor} size={30} />
            )
          }
        }
      )
    })
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false
    }
  }
);

const Navigation = createAppContainer(TabNavigator);

export default class extends Component {
  componentDidMount() {
    registerForPushNotifications();
    Notifications.addListener(notification => {
      const {
        data: { text },
        origin
      } = notification;

      if (origin === 'received' && text) {
        Alert.alert('Job Fined', text, [{ text: 'Ok' }]);
      }
    });
  }

  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </PersistGate>
    );
  }
}
