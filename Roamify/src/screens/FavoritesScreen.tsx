import {View} from 'react-native';
import React from 'react';
import {globalStyles} from '../theme/globalStyles';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import TextComponent from '../components/TextComponent';
import BarComponent from '../components/BarComponent';
import CardComponent from '../components/CardComponent';
import CardContainer from '../components/CardContainer';

const FavoritesScreen = () => {
  return (
    <View style={globalStyles.screen}>
      <Header />
      <BarComponent />
      <TextComponent
        text="Tus Favoritos"
        font="bold"
        size={25}
        styles={{paddingLeft: 25}}
      />
      <CardContainer>
        <CardComponent
          name="La Petatera"
          description="La artesanía más grande del mundo. Tiene un cupo para 6,400 personas entre gradas..."
          image={require('../assets/sample-image.jpg')}
          favorite
        />
        <CardComponent
          description="lorem"
          name="lorem"
          image={require('../assets/sample-image.jpg')}
          favorite
        />
        <CardComponent
          description="lorem"
          name="lorem"
          image={require('../assets/sample-image.jpg')}
          favorite
        />
      </CardContainer>
      <NavBar />
    </View>
  );
};

export default FavoritesScreen;
