import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import CardComponent from '../components/CardComponent';
import CardContainer from '../components/CardContainer';
import {useNavigation} from '@react-navigation/native';

const MyEventsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={styles.eventContainer}>
        <TextComponent text="Crear un evento" font="bold" size={26} />
        <ButtonComponent
          text="+"
          styles={styles.button}
          /* @ts-ignore */
          onPress={() => navigation.navigate('AddEventScreen')}
        />
      </View>
      <CardContainer>
        <TextComponent text="Evento activo" font="bold" size={22} />
        <CardComponent
          name="La Petatera"
          description="La artesanía más grande del mundo. Tiene un cupo para 6,400 personas entre gradas..."
          image={require('../assets/sample-image.jpg')}
        />
        <TextComponent text="Historial de eventos" font="bold" size={22} />
        <CardComponent
          name="La Petatera"
          description="La artesanía más grande del mundo. Tiene un cupo para 6,400 personas entre gradas..."
          image={require('../assets/sample-image.jpg')}
        />
      </CardContainer>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#47C6E6',
  },
});

export default MyEventsScreen;
