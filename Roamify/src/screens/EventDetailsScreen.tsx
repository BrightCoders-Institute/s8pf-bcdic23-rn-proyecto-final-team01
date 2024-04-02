import React, { useState, useEffect } from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import TextComponent from '../components/TextComponent';
import ReviewComponent from '../components/ReviewComponent';
import FabComponent from '../components/FabComponent';
import {PropsNavigator} from '../navigation/Navigation';
import InfoItem from '../components/InfoItem';
import MapsEventDetailsComponent from '../components/googlemaps/MapsEventDetailsComponent';
import axios from 'axios';

const EventDetailsScreen = ({navigation, route}: PropsNavigator) => {
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


  if (!route.params) {
    return null;
  }
  return (
    <ScrollView>
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
        <View style={styles.detailsContainer}>
          <TextComponent
            text={!data.nameEvent ? data.name : data.nameEvent}
            font="bold"
            size={28}
          />
          <InfoItem icon="location" eventData={direccion} />
          {data.date && <InfoItem icon="calendar" eventData={data.date} />}
          {data.time && <InfoItem icon="time" eventData={data.time} />}
          {data.time && <InfoItem icon="cash" eventData={data.price} />}
          <TextComponent
            text={
              !data.descriptionEvent ? data.description : data.descriptionEvent
            }
          />
        </View>
      </View>
      <View style={styles.mapContainer} >
        {/* <GoogleMapComponent /> */}
        <MapsEventDetailsComponent 
          latitude={data.map.latitude}
          longitude={data.map.longitude}
          title={!data.nameEvent ? data.name : data.nameEvent}/>
      </View>
      <View style={styles.review}>
        <ReviewComponent
          image={require('../assets/user.jpg')}
          userName="Nombre del usuario"
          userReview="Reseña del usuario"
        />
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
  iconGray: {
    color: '#949494',
    marginRight: 10,
  },
  icon: {
    color: '#FFD43B',
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
});

export default EventDetailsScreen;
