// React Native components
import {
  TextInput as InputComp,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../theme/globalStyles';

// Receives all Input props
const InputComponent = (props: TextInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry);

  const handleShowHide = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={globalStyles.rowContainer}>
      <InputComp
        {...props}
        placeholderTextColor={'#6A6A6A'}
        secureTextEntry={secureTextEntry}
      />
      {props.secureTextEntry ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShowHide}
          style={{marginHorizontal: -30}}>
          {secureTextEntry ? (
            <Icon name="eye-outline" size={18} color="black" />
          ) : (
            <Icon name="eye-off-outline" size={18} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputComponent;
