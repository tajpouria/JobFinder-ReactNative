import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';

import Swipe from '../components/Swipe';
import * as actions from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="description" color={tintColor} size={30} />
    )
  };

  renderCard = job => {
    const {
      latitude,
      longitude,
      jobtitle,
      company,
      formattedRelativeTime,
      snippet
    } = job;

    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.15329229609682216,
      longitudeDelta: 0.11688027530910006
    };

    return (
      <Card title={jobtitle}>
        <MapView
          initialRegion={initialRegion}
          scrollEnabled={false}
          style={styles.mapView}
          cacheEnabled={Platform.OS === 'android'}
        >
          <MapView.Marker coordinate={initialRegion} />
        </MapView>
        <View style={styles.detailContainer}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>
        <Text>{snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}</Text>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    const { navigate } = this.props.navigation;
    return (
      <Card title="No Jobs Available!">
        <Button
          title="Go To The liked Jobs list."
          icon={{ name: 'favorite' }}
          onPress={() => navigate('review')}
        />
      </Card>
    );
  };

  render() {
    const { jobs, likeJob } = this.props;
    return (
      <Swipe
        data={jobs}
        renderNoMoreCards={this.renderNoMoreCards}
        renderCard={this.renderCard}
        keyProp="jobkey"
        onSwipeRight={job => likeJob(job)}
      />
    );
  }
}
{
}
const mapStateToProps = ({ jobs }) => ({ jobs });

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  mapView: {
    width: SCREEN_WIDTH * 0.83333333333,
    height: SCREEN_HEIGHT * 0.390625
  }
});

export default connect(
  mapStateToProps,
  actions
)(DeckScreen);
