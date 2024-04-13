import { FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { getDate } from '../hooks/getDate';
import { getFavorites } from '../hooks/getFavorites';
import { useAuth } from '../contexts/AuthContext';

const FavoritesDataComponent = () => {
  const navigation = useNavigation();
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const today = getDate();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFavoriteEventIds = async () => {
      try {
        const favoritesData = await getFavorites(userId);
        const favoriteEventIds = favoritesData.map(favorite => favorite.id);
        const favoriteLocationsArray = await fetchLocations(favoriteEventIds);
        setFavoriteLocations(favoriteLocationsArray);
      } catch (error) {
        console.error('Error al obtener los eventos favoritos:', error);
      }
    };

    fetchFavoriteEventIds();
  }, [userId]);

  const fetchLocations = async (favoriteEventIds) => {
    if (favoriteEventIds.length === 0) return [];

    const locationsArray = [];
    const locationsSnapshot = await firestore()
      .collection('locations')
      .where(firestore.FieldPath.documentId(), 'in', favoriteEventIds)
      .get();

    locationsSnapshot.forEach(documentSnapshot => {
      locationsArray.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      });
    });

    return locationsArray;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ paddingHorizontal: 25 }}
        data={favoriteLocations}
        renderItem={({ item }) => (
          <CardComponent
            id={item.id}
            onPress={() => navigation.navigate('EventDetailsScreen', { data: item })}
            key={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

export default FavoritesDataComponent;


