import {
  TextInput as InputComp,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const InputComponent = (props: TextInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry);

  const handleShowHide = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <InputComp
        {...props}
        placeholderTextColor={'#6A6A6A'}
        secureTextEntry={secureTextEntry}
        style={styles.inputContainer}
      />
      {props.secureTextEntry ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShowHide}
          style={{marginHorizontal: -35}}>
          {secureTextEntry ? (
            <Icon name="eye-outline" size={20} color="black" />
          ) : (
            <Icon name="eye-off-outline" size={20} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F2F3F5',
    borderRadius: 10,
    paddingLeft: 15,
    width: '100%',
    color: '#040415',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default InputComponent;
