import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  onPress?: () => void;
}

const CheckBoxComponent = (props: Props) => {
  const {onPress} = props;

  return (
    <BouncyCheckbox
      size={25}
      fillColor="#47C6E6"
      unfillColor="#fff"
      textStyle={{textDecorationLine: 'none', color: '#B6B7BA'}}
      iconStyle={{borderRadius: 0, marginVertical: 10}}
      innerIconStyle={{borderRadius: 5}}
      onPress={onPress}
    />
  );
};

export default CheckBoxComponent;
