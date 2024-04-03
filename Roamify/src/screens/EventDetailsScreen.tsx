import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import TextComponent from '../components/TextComponent';
import FabComponent from '../components/FabComponent';
import InfoItem from '../components/InfoItem';
import {ScrollView} from 'react-native-gesture-handler';
import CommentComponent from '../components/CommentComponent';
import firestore from '@react-native-firebase/firestore';
import ReviewComponent from '../components/ReviewComponent';
import {useAuth} from '../contexts/AuthContext';

/* @ts-ignore */
const EventDetailsScreen = ({navigation, route}) => {
  const {data} = route.params;

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
      <Image
        source={{uri: data.image}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <TextComponent text={data.name} font="bold" size={28} />
        <InfoItem icon="location" eventData="Ver dirección en el mapa" />
        {data.date && <InfoItem icon="calendar" eventData={data.date} />}
        {data.time && <InfoItem icon="time" eventData={data.time} />}
        {data.price && <InfoItem icon="cash" eventData={data.price} />}
        <TextComponent text={data.description} />
      </View>
      <View style={styles.detailsContainer}>
        <Image
          source={require('../assets/map.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
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
});

export default EventDetailsScreen;
