// React native
import {Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';

interface Props {
  text: string;
  color?: string;
  size?: number;
  styles?: StyleProp<TextStyle>;
  /*  backgroundColor? sting; */
  font?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}

const TextComponent = (props: Props) => {
  const {text, color, font, size, styles} = props;

  return (
    <Text
      style={[
        {
          color: color ?? '#040415',
          fontSize: size ?? 16,
          fontWeight: font,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
