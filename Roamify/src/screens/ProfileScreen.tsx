import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from '../components/TextComponent';
import LoadingComponent from '../components/LoadingComponent';
import ImageWithButton from '../components/profile/ImageWithButton';
import FormProfile from '../components/profile/FormProfile';
import FabComponent from '../components/FabComponent';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {isLoading && <LoadingComponent />}
      <View style={globalStyles.screen}>
        <View style={styles.headerContainer}>
          <FabComponent />
        </View>
        <View style={{paddingHorizontal: 25}}>
          <View>
            <TextComponent text="Mi cuenta" font="bold" size={26} />
            <View>
              <ImageWithButton setIsLoading={setIsLoading} />
            </View>
            <View>
              <FormProfile />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: '7%',
    marginTop: 8,
    marginLeft: 8,
  },
});
