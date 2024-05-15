import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
  style?: StyleProp<ViewStyle>;
  average: number;
}

const AverageGrade = (props: Props) => {
  const { style, average } = props;

  return average !== null && average !== 0 ? (
    <View style={[styles.container, style]}>
      <TextComponent text={average?.toString()} font="bold" />
      <Icon name="star" size={25} color="#A8BD29" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});

export default AverageGrade;
