import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardComponent from './CardComponent';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {getDate} from '../hooks/getDate';

interface Props {
  category?: string;
  searchQuery: string;
  setCategory: (category: string) => void;
}

const DataComponent = (props: Props) => {
  const {category, searchQuery, setCategory} = props;

  const navigation = useNavigation();
  const [locations, setLocations] = useState<Array<any>>();

  const today = getDate();

  useEffect(() => {
    const queryBase = firestore().collection('locations');
  
    const subscriber = queryBase.onSnapshot(querySnapshot => {
      let locationsArray = querySnapshot.docs.map(documentSnapshot => ({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      }));
  
      if (searchQuery) {// Filtrado de  búsqueda si hay
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        locationsArray = locationsArray.filter(item =>
          item.name.toLowerCase().includes(lowerCaseSearchQuery)
        );
      } else if (category && category !== 'Destacado') {// aqui filtro por categoria si es que no  hay busqueda y la categoria no es destacado
        locationsArray = locationsArray.filter(item => item.category === category);
      } else if (category === 'Destacado') {// si es destacado y no hay busqueda no mostrar nada pero si busqueda
        locationsArray = [];
      }
  
      setLocations(locationsArray);
    });
  
    return () => subscriber();
  }, [searchQuery, category]); // Dependencias: búsqueda y categoría.
   
  const renderItem = ({ item }) => {
    const isCategoryMatch = category === item.category;
    const isSearchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isTypeEventAndFutureDate = item.type === 'event' && item.date >= today;
    const isTypeNotEvent = item.type !== 'event';

    if ((isCategoryMatch || isSearchMatch) && (isTypeEventAndFutureDate || isTypeNotEvent)) {
      return (
        <CardComponent
          id={item.id}
          onPress={() => {
            if (item.category !== category) {
              setCategory(item.category);
            }
            /* @ts-ignore */
            navigation.navigate('EventDetailsScreen', {
              data: item,
            }); 
          }}
          key={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
        />
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{paddingHorizontal: 25}}
        data={locations}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DataComponent;