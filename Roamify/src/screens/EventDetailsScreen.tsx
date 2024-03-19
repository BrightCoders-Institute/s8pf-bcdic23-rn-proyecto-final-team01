import React from 'react';
import { View, Image, StyleSheet, ScrollView} from 'react-native';
import TextComponent from '../components/TextComponent';
import ReviewComponent from '../components/ReviewComponent';
import FabComponent from '../components/FabComponent';
import { PropsNavigator } from '../navigation/Navigation';
import InfoItem from '../components/InfoItem';
import DATA from '../API/EventsData';

const EventDetailsScreen = ({navigation, route}: PropsNavigator) => {
  const { selectedId } = route.params;
  if(!selectedId) {
    return null;
  }
  const eventData = DATA.find(item => item.id === selectedId); 
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
          source={eventData?.sample}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <InfoItem eventData={eventData?.title} fontSize={40} font="bold"/>
          <InfoItem icon="location" eventData={eventData?.description} />
          <InfoItem icon="calendar" eventData={eventData?.date} />
          <InfoItem icon="time" eventData={eventData?.hour} />
          <InfoItem icon="cash" eventData={eventData?.price}/>
          <InfoItem eventData={eventData?.description}/>
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
    color: "#FFD43B",
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
  }
});

export default EventDetailsScreen;
