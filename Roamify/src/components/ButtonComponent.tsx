import React from 'react';
import TextComponent from './TextComponent';
import { globalStyles } from '../theme/globalStyles';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  text: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
}

const ButtonComponent = (props: Props) => {
  const { text, onPress, styles, disabled } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles ? styles : globalStyles.buttonPrimary}
      disabled={disabled}
      activeOpacity={0.7}>
      <TextComponent text={text} font="bold" color="white" />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
