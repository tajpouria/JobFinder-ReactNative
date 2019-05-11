import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESSFUL } from './types';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb-token');

  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESSFUL, payload: token });
  } else {
    doFaceBookLogin(dispatch);
  }
};

const doFaceBookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '360477574591368',
    {
      permissions: ['public_profile']
    }
  );

  if (type === 'cancel') return dispatch({ type: FACEBOOK_LOGIN_FAIL });

  await AsyncStorage.setItem('fb-token', token);
  return dispatch({ type: FACEBOOK_LOGIN_SUCCESSFUL, payload: token });
};
