import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

export default async () => {
  const previousToken = await AsyncStorage.getItem('pushtoken');
  if (previousToken) return;

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (!status === 'granted') return;

  const token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  await AsyncStorage.setItem('pushtoken', token);
};
