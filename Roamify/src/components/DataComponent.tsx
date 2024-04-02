import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../hooks/getData';
import CardComponent from './CardComponent';
import {useNavigation} from '@react-navigation/native';

interface Props {
  category: string;
  isPlace?: boolean;
}

const DataComponent = (props: Props) => {
  const {category, isPlace} = props;

  const navigation = useNavigation();
  const [events, setEvents] = useState<Array<any>>();
  const [places, setPlaces] = useState<Array<any>>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getData();
        setEvents(data?.eventsData);
        setPlaces(data?.placesData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <FlatList
      style={{paddingHorizontal: 25}}
      data={isPlace ? places : events}
      renderItem={({item}) =>
        category === item.category && (
          <CardComponent
            onPress={() =>
              /* @ts-ignore */
              navigation.navigate('EventDetailsScreen', {
                data: item,
              })
            }
            key={isPlace ? item.name : item.nameEvent}
            name={isPlace ? item.name : item.nameEvent}
            description={isPlace ? item.description : item.descriptionEvent}
            image={item.image}
          />
        )
      }
    />
  );
};

export default DataComponent;
