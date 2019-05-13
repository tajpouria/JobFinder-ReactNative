import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Linking,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Liked Jobs',
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
    },
    tabBarOption: {
      title: 'Liked'
    }
  });

  renderLikedJobs() {
    const { likeJobs } = this.props;

    return likeJobs.map(job => {
      const {
        jobtitle,
        company,
        formattedRelativeTime,
        jobkey,
        url,
        latitude,
        longitude
      } = job;

      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.15329229609682216,
        longitudeDelta: 0.11688027530910006
      };

      return (
        <Card key={jobkey} title={jobtitle}>
          <MapView
            initialRegion={initialRegion}
            scrollEnabled={false}
            style={styles.mapView}
            cacheEnabled={Platform.OS === 'android'}
          >
            <MapView.Marker coordinate={initialRegion} />
          </MapView>
          <View style={styles.detailContainer}>
            <Text style={styles.details}>{company}</Text>
            <Text style={styles.details}>{formattedRelativeTime}</Text>
          </View>
          <Button
            title="Apply Now"
            large
            onPress={() => Linking.openURL(url)}
          />
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  details: {
    fontStyle: 'italic'
  },
  mapView: {
    height: SCREEN_HEIGHT * 0.390625,
    width: SCREEN_WIDTH * 0.83333333333
  }
});

const mapStateToProps = ({ likeJobs }) => ({ likeJobs });

export default connect(mapStateToProps)(ReviewScreen);
