import React from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CardComponent from './CardComponent';
import {getDate} from '../hooks/getDate';
import {LocationProps, ResquestlocationProps} from './types';

interface Props {
  category?: string;
  searchQuery: string;
  locations: ResquestlocationProps[];
}

const DataComponent = (props: Props) => {
  const {category, searchQuery, locations} = props;
  const navigation = useNavigation();
  const today = getDate();

  const renderItem = ({ item }: { item: LocationProps }) => {
    const isCategoryMatch = category === item.category;
    const isSearchMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isTypeEventAndFutureDate =
      item.type === 'event' && item.date >= today;
    const isTypeNotEvent = item.type !== 'event';

    if (
      (isCategoryMatch || isSearchMatch) &&
      (isTypeEventAndFutureDate || isTypeNotEvent)
    ) {
      return (
        <CardComponent
          id={item.id}
          onPress={() => {
            /* @ts-ignore */
            navigation.navigate('EventDetailsScreen', {
              data: item,
            });
          }}
          key={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
          average={item.average}
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DataComponent;
