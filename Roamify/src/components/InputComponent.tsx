import {
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../theme/globalStyles';
import {Controller, FieldError} from 'react-hook-form';
import {FormFieldProps} from '../../types';

const InputComponent: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  style,
  secureTextEntry,
  register,
  error,
}) => {
  const [secureTextEntryState, setSecureTextEntryState] =
    useState(secureTextEntry);

  const handleShowHide = () => {
    setSecureTextEntryState(!secureTextEntryState);
  };

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <View style={globalStyles.rowContainer}>
        {/* <>
          {console.log(name, error)}
          {console.log(name, register)}
        </> */}
        <TextInput
          style={style}
          placeholder={placeholder}
          placeholderTextColor={'#6A6A6A'}
          secureTextEntry={secureTextEntryState}
          {...register(name)}
        />
        <>
          {secureTextEntry ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleShowHide}
              style={{marginHorizontal: -35}}>
              {secureTextEntryState ? (
                <Icon name="eye-outline" size={22} color="black" />
              ) : (
                <Icon name="eye-off-outline" size={22} color="black" />
              )}
            </TouchableOpacity>
          ) : null}
        </>
      </View>
      {error && (
        <Text
          style={{
            color: 'black',
            alignSelf: 'stretch',
            fontSize: 12,
          }}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default InputComponent;
