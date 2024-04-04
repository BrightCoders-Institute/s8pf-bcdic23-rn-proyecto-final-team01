import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../hooks/getData';
import CardComponent from './CardComponent';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

interface Props {
  category: string;
}

const DataComponent = (props: Props) => {
  const {category} = props;

  const navigation = useNavigation();
  const [locations, setLocations] = useState<Array<any>>();

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
    <FlatList
      style={{paddingHorizontal: 25}}
      data={locations}
      renderItem={({item}) =>
        category === item.category ? (
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
        ) : null
      }
    />
  );
};

export default DataComponent;
