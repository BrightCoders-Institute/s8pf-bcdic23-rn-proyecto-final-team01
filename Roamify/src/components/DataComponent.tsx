import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CardComponent from './CardComponent';
import { getDate } from '../hooks/getDate';
import { getReviews } from '../hooks/getReviews';
import { calculateAverageRating } from './AverageGrade';

interface Props {
  category?: string;
  searchQuery: string;
  setCategory: (category: string) => void;
}

const DataComponent = (props: Props) => {
  const { category, searchQuery, setCategory } = props;
  const navigation = useNavigation();
  const [locations, setLocations] = useState<Array<any>>();
  const today = getDate();

  useEffect(() => {
    const queryBase = firestore().collection('locations');
    const subscriber = queryBase.onSnapshot(async querySnapshot => {
      let locationsArray = querySnapshot.docs.map(documentSnapshot => ({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      }));

      if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        locationsArray = locationsArray.filter(item =>
          item.name.toLowerCase().includes(lowerCaseSearchQuery)
        );
      } else if (category && category !== 'Destacado') {
        locationsArray = locationsArray.filter(item => item.category === category);
      } else if (category === 'Destacado') {
        locationsArray = await filterHighlightedLocations(locationsArray);
      }

      setLocations(locationsArray);
    });

    return () => subscriber();
  }, [searchQuery, category]);

  const filterHighlightedLocations = async (locationsArray) => {
    const filteredLocations = [];
    for (const location of locationsArray) {
      const reviewsData = await getReviews(location.id);
      const average = calculateAverageRating(reviewsData?.reviewsData);
      if (average >= 4.5) {
        filteredLocations.push(location);
      }
    }
    return filteredLocations;
  };

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