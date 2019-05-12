import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.9
      }
    };
  }

  onRegionChangeComplete = region => this.setState({ region });

  onButtonPress = () => {
    const { fetchJobs } = this.props;
    const { region } = this.state;
    fetchJobs(region);
  };

  render() {
    const { region } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          onRegionChangeComplete={this.onRegionChangeComplete}
          region={region}
          style={{ flex: 1 }}
        />
        <View style={styles.ButtonContainer}>
          <Button
            title="Search This Area"
            icon={{ name: 'search' }}
            large
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10
  }
});

export default connect(
  null,
  actions
)(MapScreen);
