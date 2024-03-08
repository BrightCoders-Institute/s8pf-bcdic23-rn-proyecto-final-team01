import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../theme/globalStyles';
import {Controller} from 'react-hook-form';
import {InputFileProps} from '../../types';
import DocumentPicker from 'react-native-document-picker';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputFileComponent: React.FC<InputFileProps> = ({
  name,
  placeholder,
  style,
  control,
  errors,
  setValue,
  icon,
  location,
  setLocation,
}) => {
  const [nameFile, setNameFile] = useState(placeholder);
  const navigation = useNavigation();


  const onFileSelect = async () => {
    if (name === 'map') {
      navigation.navigate('GoogleMapComponent', { location, setLocation });
      return;
    }
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setValue('file', result);
      setNameFile(result[0].name);
    } catch (err) {
      setNameFile(placeholder);
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file selection');
      } else {
        console.error(`Error picking file: ${err}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[style, {paddingVertical: 10}]}>
        <Controller
          control={control}
          render={({field}) => (
            <TouchableOpacity onPress={onFileSelect}>
              <TextComponent text={nameFile} color="#6A6A6A" size={14} />
            </TouchableOpacity>
          )}
          name={name}
          defaultValue={null}
        />
        {errors.file && (
          <Text style={{color: 'red'}}>{errors.file.message}</Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={22} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  iconContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#47C6E6',
  },
});

export default InputFileComponent;
