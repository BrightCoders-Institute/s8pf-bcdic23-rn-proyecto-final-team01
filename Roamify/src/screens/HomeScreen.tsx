import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import BarComponent from '../components/BarComponent';
import {getData} from '../hooks/getData';
import CardComponent from '../components/CardComponent';
import DataComponent from '../components/DataComponent';
import TextComponent from '../components/TextComponent';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('Destacado');

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
      <View style={{marginTop: 15, flex: 1}}>
        <View style={{paddingBottom: 15}}>
          <BarComponent setSelectedCategory={setCategory} />
        </View>
        <DataComponent
          category={category}
          isPlace={
            category !== 'Sociales' &&
            category !== 'Festivos' &&
            category !== 'Por Temporada'
          }
        />
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

export default HomeScreen;
