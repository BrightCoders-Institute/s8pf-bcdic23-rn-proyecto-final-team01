import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  text?: string;
}

const CheckBoxComponent = (props: Props) => {
  const {text} = props;

  return (
    <BouncyCheckbox
      size={25}
      fillColor="#47C6E6"
      unfillColor="#fff"
      text={text}
      textStyle={{textDecorationLine: 'none', color: '#B6B7BA'}}
      iconStyle={{borderRadius: 0, marginVertical: 10}}
      innerIconStyle={{borderRadius: 5}}
      onPress={(isChecked: boolean) => {
        console.log(isChecked);
      }}
    />
  );
};

export default CheckBoxComponent;
