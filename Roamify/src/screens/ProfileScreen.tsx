import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import { globalStyles } from '../theme/globalStyles';
import TextComponent from '../components/TextComponent';
import LoadingComponent from '../components/LoadingComponent';
import ImageWithButton from '../components/ImageWithButton';

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
              <ImageWithButton setIsLoading={setIsLoading} />
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
  },
});