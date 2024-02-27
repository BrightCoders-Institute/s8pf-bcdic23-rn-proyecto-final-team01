import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  fontColor?: string;
  borderColor?: string;
  backgroundColor?: string;
}

const BadgeComponent = (props: Props) => {
  const {text, fontColor, borderColor, backgroundColor} = props;

  return (
    <View
      style={[
        {
          borderColor: borderColor ?? 'black',
          backgroundColor: backgroundColor ?? '#D9D9D9',
        },
        styles.badgeContainer,
      ]}>
      <TextComponent
        text={text}
        color={fontColor ? fontColor : 'black'}
        font="bold"
        size={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    padding: 5,
    borderRadius: 100,
    borderWidth: 2,
    minWidth: 70,
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BadgeComponent;
