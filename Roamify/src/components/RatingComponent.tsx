import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const RatingComponent = () => {
  return (
    <View style={styles.container}>
      <Icon name="star" color="#A8BD29" size={22} />
      <Icon name="star" color="#A8BD29" size={22} />
      <Icon name="star" color="#A8BD29" size={22} />
      <Icon name="star" color="#A8BD29" size={22} />
      <Icon name="star-outline" color="#A8BD29" size={22} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
});

export default RatingComponent;
