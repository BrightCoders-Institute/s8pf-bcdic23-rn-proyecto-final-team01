import {View} from 'react-native';
import React from 'react';
import {globalStyles} from '../theme/globalStyles';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import TextComponent from '../components/TextComponent';
import BarComponent from '../components/BarComponent';
import CardComponent from '../components/CardComponent';

const FavoritesScreen = () => {
  return (
    <View style={globalStyles.screen}>
      <Header />
      <TextComponent
        text="Tus Favoritos"
        font="bold"
        size={25}
        styles={{paddingLeft: 25, paddingVertical: 15}}
      />
      <View style={{flex: 1}}></View>
      <NavBar />
    </View>
  );
};

export default FavoritesScreen;
