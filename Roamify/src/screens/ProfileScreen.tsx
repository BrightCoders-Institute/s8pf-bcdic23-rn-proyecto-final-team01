import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import { globalStyles } from '../theme/globalStyles';
import TextComponent from '../components/TextComponent';
// import ImageInputComponent from '../components/ImageInputComponent';
import LoadingComponent from '../components/LoadingComponent';
import ImageInput from '../components/ImageInputComponent';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {isLoading && <LoadingComponent />}
      <View style={globalStyles.screen}>
        <Header />
        <View style={{ paddingHorizontal: 25 }}>
          <View>
            <TextComponent text="Mi cuenta" font="bold" size={26} />
            <View>
              <Image style={styles.userimage} source={require('../assets/user.jpg')} />
              <ImageInput setIsLoading={setIsLoading}/>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  userimage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000'
  },
});