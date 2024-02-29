import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  active?: boolean;
  onPress?: () => void;
}

const BarItemComponent = (props: Props) => {
  const {text, active, onPress} = props;

  return (
    <TouchableOpacity
      style={[styles.touchableStyle, active && {opacity: 1}]}
      onPress={onPress}>
      <TextComponent text={text} font="bold" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#9BEBFF',
    opacity: 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default BarItemComponent;
