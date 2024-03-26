import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import TextComponent from '../components/TextComponent';
import ReviewComponent from '../components/ReviewComponent';
import FabComponent from '../components/FabComponent';
import {PropsNavigator} from '../navigation/Navigation';
import InfoItem from '../components/InfoItem';

const EventDetailsScreen = ({navigation, route}: PropsNavigator) => {
  const {data} = route.params;

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
          <TextComponent text={data.nameEvent} font="bold" size={28} />
          <InfoItem icon="location" eventData="Ver dirección en el mapa" />
          <InfoItem icon="calendar" eventData={data.date} />
          <InfoItem icon="time" eventData={'6:00 PM'} />
          <InfoItem icon="cash" eventData={'$199.00'} />
          <TextComponent text={data.descriptionEvent} />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        {/* <GoogleMapComponent /> */}
        <Image
          source={require('../assets/map.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
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
});

export default EventDetailsScreen;
