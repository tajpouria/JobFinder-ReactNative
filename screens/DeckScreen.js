import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';

import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  renderCard(job) {
    return (
      <Card title={job.jobtitle}>
        <View style={styles.detailContainer}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}</Text>
      </Card>
    );
  }

  render() {
    const jobs = this.props;
    return <Swipe data={jobs} renderCard={this.renderCard} />;
  }
}

const mapStateToProps = ({ jobs }) => ({ jobs });

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
});

export default connect(mapStateToProps)(DeckScreen);
