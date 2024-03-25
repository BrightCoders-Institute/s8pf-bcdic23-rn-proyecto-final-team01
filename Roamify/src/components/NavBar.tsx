import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../theme/globalStyles';
import NavItemComponent from './NavItemComponent';
import {useNavigation, useRoute} from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [active, setActive] = useState('HomeScreen');

  const handleScreen = (text: string) => {
    setActive(text);
    /* @ts-ignore */
    navigation.navigate(text);
  };

  return (
    <View style={[globalStyles.rowContainer, styles.navBarContainer]}>
      <NavItemComponent
        text="Home"
        icon={route.name === 'HomeScreen' ? 'home' : 'home-outline'}
        active={route.name === 'HomeScreen'}
        onPress={() => handleScreen('HomeScreen')}
      />
      <NavItemComponent
        text="Mis Eventos"
        icon={route.name === 'MyEventsScreen' ? 'add-circle' : 'add-outline'}
        active={
          route.name === 'MyEventsScreen' || route.name === 'AddEventScreen'
        }
        onPress={() => handleScreen('MyEventsScreen')}
      />
      <NavItemComponent
        text="Mapa"
        icon={route.name === 'MapScreen' ? 'map' : 'map-outline'}
        active={route.name === 'MapScreen'}
        onPress={() => handleScreen('MapScreen')}
      />
      <NavItemComponent
        text="Favoritos"
        icon={route.name === 'FavoritesScreen' ? 'heart' : 'heart-outline'}
        active={route.name === 'FavoritesScreen'}
        onPress={() => handleScreen('FavoritesScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    gap: 20,
    justifyContent: 'center',
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
});

export default NavBar;
