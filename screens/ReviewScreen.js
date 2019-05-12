import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'ReviewScreen',
    headerRight: (
      <Button
        onPress={() => {
          navigation.navigate('setting');
        }}
        containerStyle={{ marginRight: 15 }}
        title="Setting"
      />
    ),
    style: {
      marginTop: Platform.OS === 'android' ? 25 : 0
    }
  });

  render() {
    return (
      <View>
        <Text> ReviewScreen </Text>
      </View>
    );
  }
}

export default ReviewScreen;
