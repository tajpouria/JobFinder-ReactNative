import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

const SettingScreen = props => (
  <View style={{ marginTop: 10 }}>
    <Button
      onPress={() => props.clearLikedJobs()}
      large
      title="Clear All Liked Jobs List"
      icon={{ name: 'delete-forever' }}
    />
  </View>
);

export default connect(
  null,
  actions
)(SettingScreen);
