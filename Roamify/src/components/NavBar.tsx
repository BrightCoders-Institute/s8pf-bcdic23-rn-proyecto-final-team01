// React native
import {View, StyleSheet} from 'react-native';
import React from 'react';

// Global styles
import {globalStyles} from '../theme/globalStyles';

// Components
import TextComponent from './TextComponent';

// Libraries
import {TouchableOpacity} from 'react-native-gesture-handler';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

const NavBar = () => {
  return (
    <View style={[globalStyles.rowContainer, styles.navBarContainer]}>
      <TouchableOpacity activeOpacity={0.6} style={styles.navItem}>
        <Icon name="home" color={'#3D5C00'} size={25} />
        <TextComponent text="Home" color="#3D5C00" size={14} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.navItem}>
        <Icon name="add-outline" color={'#3D5C00'} size={25} />
        <TextComponent text="Mis Eventos" color="#3D5C00" size={14} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.navItem}>
        <Icon name="map" color={'#3D5C00'} size={25} />
        <TextComponent text="Mapa" color="#3D5C00" size={14} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.navItem}>
        <Icon name="heart" color={'#3D5C00'} size={25} />
        <TextComponent text="Favoritos" color="#3D5C00" size={14} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    gap: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default NavBar;
