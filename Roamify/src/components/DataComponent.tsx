import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardComponent from './CardComponent';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {getDate} from '../hooks/getDate';

interface Props {
  category?: string;
}

const DataComponent = (props: Props) => {
  const {category} = props;

  const navigation = useNavigation();
  const [locations, setLocations] = useState<Array<any>>();

  const today = getDate();

  useEffect(() => {
    const subscriber = firestore()
      .collection('locations')
      .onSnapshot(querySnapshot => {
        const locationsArray = [];
        querySnapshot.forEach(documentSnapshot => {
          locationsArray.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setLocations(locationsArray);
      });
    return () => subscriber();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{paddingHorizontal: 25}}
        data={locations}
        renderItem={({item}) => {
          if (category === item.category) {
            if (item.type === 'event' && item.date >= today) {
              return (
                <CardComponent
                  id={item.id}
                  onPress={() =>
                    /* @ts-ignore */
                    navigation.navigate('EventDetailsScreen', {
                      data: item,
                    })
                  }
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                />
              );
            } else if (item.type !== 'event') {
              return (
                <CardComponent
                  id={item.id}
                  onPress={() =>
                    /* @ts-ignore */
                    navigation.navigate('EventDetailsScreen', {
                      data: item,
                    })
                  }
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                />
              );
            }
          }
          return null;
        }}
      />
    </View>
  );
};

export default DataComponent;
