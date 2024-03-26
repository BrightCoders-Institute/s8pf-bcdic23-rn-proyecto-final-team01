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
      style={[
        styles.touchableStyle,
        active && {
          opacity: 1,
          backgroundColor: '#F9F9F9',
        },
      ]}
      onPress={onPress}>
      <TextComponent
        text={text}
        font="bold"
        size={16}
        /* styles={[{color: 'white'}, active && {color: '#040415'}]} */
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    opacity: 0.4,
    borderRadius: 100,
  },
});

export default BarItemComponent;
