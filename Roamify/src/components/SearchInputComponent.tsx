import {
  TextInput as InputComp,
  StyleSheet,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const AlternativeInputComponent = (props: TextInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name="magnifying-glass" size={20} color={'#4D4D4D'} />
      <InputComp
        style={styles.inputStyle}
        placeholder="Busca un evento"
        placeholderTextColor={'#6A6A6A'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 25,
    width: '100%',
    paddingLeft: 15,
    borderColor: '#B7B7B7',
    color: '#040415',
  },
});

export default AlternativeInputComponent;
