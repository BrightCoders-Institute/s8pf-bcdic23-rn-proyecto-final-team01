import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import CardComponent from '../components/CardComponent';
import BarComponent from '../components/BarComponent';
import CardContainer from '../components/CardContainer';


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('EventDetails'); 
  };

  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={styles.container}>
        <Icon
          name="search"
          color="#6A6A6A"
          size={25}
          style={{marginRight: -45}}
        />
        <TextInput
          placeholder="Busca un lugar o evento"
          placeholderTextColor="#6A6A6A"
          style={globalStyles.inputSecondary}
        />
      </View>
      <BarComponent />
      <CardContainer>
      <TouchableOpacity onPress={handleCardPress}>
          <CardComponent
            name="La Petatera"
            description="La artesanía más grande del mundo. Tiene un cupo para 6,400 personas entre gradas..."
            image={require('../assets/sample-image.jpg')}
          />
        </TouchableOpacity>
        <CardComponent
          description="lorem"
          name="lorem"
          image={require('../assets/sample-image.jpg')}
        />
        <CardComponent
          description="lorem"
          name="lorem"
          image={require('../assets/sample-image.jpg')}
        />
      </CardContainer>
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

export default HomeScreen;
