// React native
import {View} from 'react-native';
import React from 'react';

// Components
import TextComponent from './TextComponent';

interface Props {
  text: string;

  required?: boolean;
}

const LabelComponent = (props: Props) => {
  const {text, required} = props;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
      }}>
      <TextComponent text={text} font="bold" size={16} />
      {required === true && <TextComponent text="*" color="red" />}
    </View>
  );
};

export default LabelComponent;
