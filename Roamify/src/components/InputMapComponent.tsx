import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyles} from '../theme/globalStyles';
import {Controller} from 'react-hook-form';
import {InputFileProps} from '../../types';
import DocumentPicker from 'react-native-document-picker';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputMapComponent: React.FC<InputFileProps> = ({
  name,
  style,
  control,
  errors,
  setValue,
  icon,
  location,
  setLocation,
}) => {
  const [nameFile, setNameFile] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (location == null) {
      setNameFile('Seleccionar ubicación');
    } else {
      setNameFile('Se guardo la ubicación');
    }
    setValue('map', location);
  }, [location]);

  const onFileSelect = async () => {
    if (name === 'map') {
      /* @ts-ignore */
      navigation.navigate('GoogleMapComponent', {location, setLocation});
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <View style={[style, {paddingVertical: 10}]}>
          <Controller
            control={control}
            render={e => (
              <TouchableOpacity onPress={onFileSelect}>
                <TextComponent text={nameFile} color="#6A6A6A" size={14} />
              </TouchableOpacity>
            )}
            name={name}
            defaultValue={null}
          />
        </View>
        {name === 'map' && errors.map && (
          <Text style={{color: 'red', fontSize: 12}}>{errors.map.message}</Text>
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
    alignItems: 'flex-start',
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

export default InputMapComponent;
