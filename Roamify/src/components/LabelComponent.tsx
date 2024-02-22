import {Text, View} from 'react-native';
import React from 'react';

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
      <Text style={{fontSize: 16, color: '#040415', fontWeight: 'bold'}}>
        {text}
      </Text>
      {required === true && <Text style={{color: 'red'}}>*</Text>}
    </View>
  );
};

export default LabelComponent;
