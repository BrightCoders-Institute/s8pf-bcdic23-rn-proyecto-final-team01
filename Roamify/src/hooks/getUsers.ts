import firestore from '@react-native-firebase/firestore';

export const getUsers = async () => {
  try {
    const users = await firestore().collection('users').get();
    const usersData = users.docs.map(doc => ({id: doc.id, ...doc.data()}));

    return {usersData};
  } catch (error) {
    console.error('Error fetching the items: ' + error);
  }
};
