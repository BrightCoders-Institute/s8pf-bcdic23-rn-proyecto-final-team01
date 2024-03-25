import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../hooks/getData';
import CardComponent from './CardComponent';
import {useNavigation} from '@react-navigation/native';

interface Props {
  category: string;
  isEvent?: boolean;
  isPlace?: boolean;
}

const DataComponent = (props: Props) => {
  const {category, isEvent, isPlace} = props;

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
      data={events}
      renderItem={({item: event}) =>
        category === event.category && (
          <CardComponent
            onPress={() =>
              /* @ts-ignore */
              navigation.navigate('EventDetailsScreen', {
                data: event,
              })
            }
            key={event.nameEvent}
            name={event.nameEvent}
            description={event.descriptionEvent}
            image={event.image}
          />
        )
      }
    />
  );
};

export default DataComponent;
