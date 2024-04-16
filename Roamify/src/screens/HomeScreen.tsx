import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import BarComponent from '../components/BarComponent';
import DataComponent from '../components/DataComponent';

const HomeScreen = () => {
  const [category, setCategory] = useState('Destacado');
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (text) => {
    setSearchQuery(text);
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
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <View style={{marginTop: 15, flex: 1}}>
        <View style={{paddingBottom: 15}}>
          <BarComponent setSelectedCategory={setCategory} />
        </View>
        <DataComponent category={category} searchQuery={searchQuery} setCategory={setCategory}/>
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
