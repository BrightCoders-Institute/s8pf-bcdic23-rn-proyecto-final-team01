import {View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import MapScreenComponent from '../components/googlemaps/MapScreenComponent';

const MapScreen = () => {
  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={{width: '100%', flex: 1}}>
        <MapScreenComponent></MapScreenComponent>
      </View>
      <NavBar />
    </View>
  );
};

export default MapScreen;
