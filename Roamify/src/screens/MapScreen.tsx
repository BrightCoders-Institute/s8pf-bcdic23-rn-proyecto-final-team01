import {Platform, StyleSheet,TextInput,View} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import MapScreenComponent from '../components/googlemaps/MapScreenComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const MapScreen = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={{...styles.mapContainer, zIndex: 1}}>
        <MapScreenComponent searchText={searchText}/>
        <View style={styles.searchBar}>
          <Icon
            name="search"
            color="#6A6A6A"
            size={25}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Busca un lugar o evento"
            placeholderTextColor="#6A6A6A"
            style={{...styles.searchInput, paddingLeft: 50}}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 88 : 40,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 0,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    position: 'absolute',
    left: 15, 
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    justifyContent: 'center',
    borderRadius: 25,
    color: '#040415', 
  },
});
export default MapScreen;
