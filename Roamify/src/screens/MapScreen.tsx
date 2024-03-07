import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import GoogleMapComponent from '../components/googlemaps/GoogleMapComponent';

const MapScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={{width: '100%', height: '78%'}}>
      <GoogleMapComponent >

      </GoogleMapComponent>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

export default MapScreen;
