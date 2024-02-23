import React from 'react';
import TextComponent from './TextComponent';
import {globalStyles} from '../theme/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  text: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const ButtonComponent = (props: Props) => {
  const {text, onPress, styles} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles ? styles : globalStyles.buttonPrimary}
      activeOpacity={0.7}>
      <TextComponent text={text} font="bold" color="white" />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
