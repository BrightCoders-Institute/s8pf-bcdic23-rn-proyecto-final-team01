import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import TextComponent from './TextComponent';
import * as ImagePicker from 'react-native-image-picker';
import {globalStyles} from '../theme/globalStyles';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonComponent from './ButtonComponent';
/* @ts-ignore */
const ImagePickerComponent = ({setDownloadLink}) => {
  const [response, setResponse] = useState(null);
  const [link, setLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onGalleryPress = useCallback(() => {
    /* @ts-ignore */
    ImagePicker.launchImageLibrary(options, setResponse);
  }, []);

  const onCameraPress = useCallback(() => {
    /* @ts-ignore */
    ImagePicker.launchCamera(options, setResponse);
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
      /* @ts-ignore */
      const {uri, fileName} = response.assets[0];
      const reference = storage().ref(`images/${fileName}`);
      await reference.putFile(uri);
      const downloadURL = await reference.getDownloadURL();
      /* @ts-ignore */
      setLink(downloadURL);
      setDownloadLink(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log('Error', 'An error occurred while uploading the image');
    } finally {
      setIsLoading(false);
    }
  };
  /* @ts-ignore */
  const renderButton = (text, onPress, styles) => (
    <ButtonComponent text={text} onPress={onPress} styles={styles} />
  );
  const renderImages = () => {
    /* @ts-ignore */
    if (!response || !response.assets) return null;
    /* @ts-ignore */
    return response.assets.map(({uri}) => (
      <View key={uri} style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={styles.image}
          source={{uri}}
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.btnContainer,
          /* @ts-ignore */
          response && response.assets && {display: 'none'},
        ]}>
        {renderButton('Galería', onGalleryPress, styles.galleryButton)}
        {renderButton('Cámara', onCameraPress, styles.cameraButton)}
      </View>
      <View>
        {renderImages()}
        {/* @ts-ignore */}
        {response && response.assets && (
          <TouchableOpacity
            style={[globalStyles.buttonPrimary, link && {display: 'none'}]}
            onPress={uploadImage}>
            <TextComponent
              text={isLoading ? 'Subiendo...' : 'Seleccionar y guardar'}
              font="bold"
              color="white"
            />
          </TouchableOpacity>
        )}
        {link && (
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

const options = {
  quality: 0.7,
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
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
