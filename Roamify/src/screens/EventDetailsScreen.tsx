import React, { useState, useEffect } from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import TextComponent from '../components/TextComponent';
import FabComponent from '../components/FabComponent';
import InfoItem from '../components/InfoItem';
import LikeButtonComponent from '../components/LikeButtonComponent';
import CommentComponent from '../components/CommentComponent';
import firestore from '@react-native-firebase/firestore';
import ReviewComponent from '../components/ReviewComponent';
import {useAuth} from '../contexts/AuthContext';
import MapsEventDetailsComponent from '../components/googlemaps/MapsEventDetailsComponent';
import axios from 'axios';

/* @ts-ignore */
const EventDetailsScreen = ({navigation, route}) => {
  const {data} = route.params;
  const [direccion, setDireccion] = useState('');
  const obtenerDireccionOSM = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.display_name) {
        setDireccion(response.data.display_name);
      } else {
        setDireccion('Dirección no encontrada');
      }
    } catch (error) {
      console.warn('Error obteniendo la dirección: ', error);
      setDireccion('Error al obtener la dirección');
    }
  };
  useEffect(() => {
    if (data?.map?.latitude && data?.map?.longitude) {
      obtenerDireccionOSM(data.map.latitude, data.map.longitude);
    }
  }, [data.map]);


  const currentUser = useAuth().userId;

  const [reviews, setReviews] = useState<Array<any>>();
  const [hasCommented, setHasCommented] = useState(false);

  const id = data.id;

  useEffect(() => {
    const subscriber = firestore()
      .collection('locations')
      .doc(id)
      .collection('reviews')
      .onSnapshot(querySnapshot => {
        const reviewsArray = [];
        querySnapshot.forEach(documentSnapshot => {
          const reviewData = documentSnapshot.data();
          reviewsArray.push({
            ...reviewData,
            id: documentSnapshot.id,
            hasCommented: reviewData.userId === currentUser,
          });
        });
        setReviews(reviewsArray);
        const hasUserCommented = reviewsArray.some(
          review => review.hasCommented,
        );
        setHasCommented(hasUserCommented);
      });
    return () => subscriber();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <FabComponent
        iconName="chevron-back"
        iconSize={30}
        iconColor="#606eee"
        onPress={() => navigation.navigate('HomeScreen')}
        styles={{top: 10, left: 16}}
      />
      <View style={styles.container}>
          <Image
            source={{uri: data.image}}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.containerHeart}>
            <LikeButtonComponent eventName={!data.nameEvent ? data.name : data.nameEvent} />
          </View>
        </View>
      <View style={styles.detailsContainer}>
        <TextComponent text={data.name} font="bold" size={28} />
        <InfoItem icon="location" eventData="Ver dirección en el mapa" />
        {data.date && <InfoItem icon="calendar" eventData={data.date} />}
        {data.time && <InfoItem icon="time" eventData={data.time} />}
        {data.price && <InfoItem icon="cash" eventData={data.price} />}
        <TextComponent text={data.description} />
      </View>
      <View style={styles.mapContainer}>
        <MapsEventDetailsComponent
          latitude={data.map.latitude}
          longitude={data.map.longitude}
          title={data.name}
        />
      </View>
      <View style={styles.detailsContainer}>
        <TextComponent text="Reseñas" font="bold" size={26} />
        <CommentComponent data={reviews} />
        {!hasCommented && <ReviewComponent locationId={id} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 20,
    flexDirection: 'column',
    gap: 10,
  },
  mapContainer: {
    padding: 80, 
    borderRadius: 15, 
    overflow: 'hidden', 
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  review: {
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  styleGoogle: {
    display: 'flex',
    width: '100%',
    height: '40%',
  },
  containerHeart: {
    position: 'absolute',
    bottom: 15,
    left: '81%',
  },
});

export default EventDetailsScreen;
