import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/globalStyles';
import { Controller } from 'react-hook-form';
import { FormFieldProps } from '../../types';

const InputComponent: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  secureTextEntry,
  control,
  rules,
  disabled,
  style,
  defaultValue
}) => {
  const [secureTextEntryState, setSecureTextEntryState] =
    useState(secureTextEntry);

  const handleShowHide = () => {
    setSecureTextEntryState(!secureTextEntryState);
  };

  return (
    <View>
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <View>
              <View style={globalStyles.rowContainer}>
                <TextInput
                  style={[globalStyles.inputPrimary, disabled && globalStyles.disabledInput, style]} // Aplicar estilo deshabilitado
                  placeholder={placeholder}
                  placeholderTextColor={'#6A6A6A'}
                  secureTextEntry={secureTextEntryState}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  editable={!disabled}
                />
                {secureTextEntry ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleShowHide}
                    style={{ marginHorizontal: -35 }}>
                    {secureTextEntryState ? (
                      <Icon name="eye-outline" size={22} color="black" />
                    ) : (
                      <Icon name="eye-off-outline" size={22} color="black" />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <>
                {fieldState?.error && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'stretch',
                      fontSize: 12,
                    }}>
                    {fieldState.error.message}
                  </Text>
                )}
              </>
            </View>
          </>
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue ? defaultValue : ''}
      />
    </View>
  );
};

export default InputComponent;
