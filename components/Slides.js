import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  lastSlideButton(index) {
    const {
      data: { length },
      authScreen
    } = this.props;
    if (index === length - 1) {
      return (
        <Button
          title="Onwards!"
          containerStyle={{ marginTop: 10 }}
          onPress={authScreen}
        />
      );
    }
    return undefined;
  }

  renderSlides() {
    const { data } = this.props;
    return data.map((slide, index) => {
      return (
        <View
          style={[styles.slideContainer, { backgroundColor: slide.color }]}
          key={slide.id}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.lastSlideButton(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#EEE',
    fontWeight: 'bold'
  }
});
