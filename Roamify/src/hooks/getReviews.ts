import firestore from '@react-native-firebase/firestore';

export const getReviews = async (id: string) => {
  try {
    const reviews = await firestore()
      .collection('locations')
      .doc(id)
      .collection('reviews')
      .get();
    const reviewsData = reviews.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {reviewsData};
  } catch (error) {
    console.error('Error fetching the items: ' + error);
  }
};
