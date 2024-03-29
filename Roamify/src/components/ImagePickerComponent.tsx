import {View, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextComponent from './TextComponent';
import * as ImagePicker from 'react-native-image-picker';
import {globalStyles} from '../theme/globalStyles';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonComponent from './ButtonComponent';

const buttons = [
  {
    id: 1,
    type: 'gallery',
    text: 'Galería',
  },
  {
    id: 2,
    type: 'camera',
    text: 'Cámara',
  },
];

const ImagePickerComponent = ({setDownloadLink}) => {
  const [response, setResponse] = React.useState<any>(null);
  const [link, setLink] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onButtonPress = React.useCallback((type, options) => {
    type === 'gallery'
      ? ImagePicker.launchImageLibrary(options, setResponse)
      : ImagePicker.launchCamera(options, setResponse);
  }, []);

  const uploadImage = async () => {
    setIsLoading(true);
    try {
      if (!response) {
        console.log(
          'No image selected',
          'Please select an image before uploading',
        );
        return;
      }
      const {uri, fileName} = response.assets[0];
      const reference = storage().ref(`images/${fileName}`);
      await reference.putFile(uri);
      const link = await reference.getDownloadURL();
      setLink(link);
      setDownloadLink(link);
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log('Error', 'An error occurred while uploading the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.btnContainer,
          response != null &&
            response?.assets != undefined && {display: 'none'},
        ]}>
        {buttons.map(button => (
          <ButtonComponent
            key={button.id}
            text={button.text}
            onPress={() => onButtonPress(button.type, options)}
            styles={
              button.type === 'gallery'
                ? styles.galleryButton
                : styles.cameraButton
            }
          />
        ))}
      </View>
      <View>
        {response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: uri}}
              />
            </View>
          ))}
        {response != null && response?.assets != undefined && (
          <TouchableOpacity
            style={[globalStyles.buttonPrimary, link && {display: 'none'}]}
            onPress={uploadImage}
            disabled={isLoading}>
            <TextComponent
              text={isLoading ? 'Subiendo...' : 'Seleccionar y guardar'}
              font="bold"
              color="white"
            />
          </TouchableOpacity>
        )}
        {link != null && (
          <View style={styles.messageContainer}>
            <TextComponent
              text="Imagen Guardada"
              font="bold"
              size={18}
              color="green"
            />
            <Icon name="checkmark-circle" color="green" size={25} />
          </View>
        )}
      </View>
    </View>
  );
};

const includeExtra = true;
const options = {
  quality: 0.7,
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 15,
    justifyContent: 'center',
  },
  galleryButton: {
    padding: 15,
    backgroundColor: '#47C6E6',
    borderRadius: 8,
    width: 125,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    padding: 15,
    backgroundColor: '#B7B7B7',
    borderRadius: 8,
    width: 125,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 215,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default ImagePickerComponent;
