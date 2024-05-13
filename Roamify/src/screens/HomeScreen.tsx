import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {globalStyles} from '../theme/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import BarComponent from '../components/BarComponent';
import DataComponent from '../components/DataComponent';
import LoadingComponent from '../components/LoadingComponent';
import firestore from '@react-native-firebase/firestore';
import {ResquestlocationProps} from '../components/types';
import {getHighlightedLocations} from '../components';

const HomeScreen = () => {
  const [category, setCategory] = useState('Destacado');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<ResquestlocationProps[]>([]);
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    setIsLoading(true);
    const queryBase = firestore().collection('locations');
    const subscriber = queryBase.onSnapshot(async querySnapshot => {
      let locationsArray: ResquestlocationProps[] = querySnapshot.docs.map(
        documentSnapshot => ({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        }),
      );
      if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        locationsArray = locationsArray.filter(
          item =>
            item.name && item.name.toLowerCase().includes(lowerCaseSearchQuery),
        );
      } else if (category && category !== 'Destacado') {
        locationsArray = locationsArray.filter(
          item => item.category === category,
        );
      } else if (category === 'Destacado') {
        locationsArray = await getHighlightedLocations(locationsArray);
      }
      setLocations(locationsArray);
      setIsLoading(false);
    });
    return () => subscriber();
  }, [searchQuery, category]);

  return (
    <>
      {isLoading && <LoadingComponent />}
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
          <DataComponent
            category={category}
            searchQuery={searchQuery}
            locations={locations}
          />
        </View>
        <NavBar />
      </View>
    </>
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
