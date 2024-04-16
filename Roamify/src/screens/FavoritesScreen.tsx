import {StyleSheet, TextInput, View} from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import FavoritesDataComponent from '../components/FavoritesDataComponent';
import TextComponent from '../components/TextComponent';
import { useIsFocused } from '@react-navigation/native';


const FavoritesScreen = () => {
  const isFocused = useIsFocused();
  

  
  return (
    <View style={globalStyles.screen}>
      <Header />
      <View style={styles.container}>
        <TextComponent text="Tus eventos favoritos" font="bold" size={28} styles={{paddingHorizontal: 30}}/>
        <FavoritesDataComponent isFocused={isFocused} />
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15, 
    flex: 1
  },
});

export default FavoritesScreen;
