import firestore from '@react-native-firebase/firestore';

export const getData = async () => {
  try {
    const events = await firestore().collection('events').get();
    const eventsData = events.docs.map(doc => doc.data());

    const places = await firestore().collection('places').get();
    const placesData = places.docs.map(place => place.data());

    return {eventsData, placesData};
  } catch (error) {
    console.error('Error fetching the items: ' + error);
  }
};
