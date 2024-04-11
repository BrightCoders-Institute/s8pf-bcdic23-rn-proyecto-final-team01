import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import InputComponent from '../InputComponent';
import {globalStyles} from '../../theme/globalStyles';
import LabelComponent from '../LabelComponent';
import Icon from 'react-native-vector-icons/Entypo';
import {InputWithIconComponentProps} from '../types';

const InputWithIconComponent = ({
  control,
  disabled,
  setDisabled,
  name,
  placeholder,
  rules,
  styles,
  textLabel,
  iconName,
  texInputDisabled,
  defaultValue,
}: InputWithIconComponentProps) => {
  const handleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <View>
      <LabelComponent text={textLabel} required />
      <View style={[globalStyles.rowContainer, globalStyles.inputContainer]}>
        {disabled ? (
          <>
            <InputComponent
              name={name}
              placeholder={placeholder}
              control={control}
              style={styles}
              rules={rules}
              disabled={!disabled}
              defaultValue={defaultValue}
            />
          </>
        ) : (
          <View style={{height: 49}}>
            <Text style={style.textDisable}>{texInputDisabled}</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleDisabled}>
          <Icon name={disabled ? 'cross' : 'pencil'} size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textDisable: {
    flex: 1,
    paddingLeft: 15,
    minWidth: 280,
    paddingTop: 15,
    marginRight: 35,
  },
});

export default InputWithIconComponent;
