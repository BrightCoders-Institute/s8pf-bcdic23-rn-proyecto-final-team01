import firestore from '@react-native-firebase/firestore';

export const getData = async () => {
  try {
    const location = await firestore().collection('locations').get();
    const locationData = await location.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {locationData};
  } catch (error) {
    console.error('Error fetching the items: ' + error);
  }
};
