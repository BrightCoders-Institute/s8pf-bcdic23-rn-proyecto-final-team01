import firestore from '@react-native-firebase/firestore';

interface FavoriteEventData {
    id: string;
  }

export const getFavorites = async  (userId: string): Promise<FavoriteEventData[]>  => {
    try {
        const favoritesSnapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .get();

            const favoritesData = favoritesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));      
      
        return favoritesData;
    } catch (error) {
        console.error('Error al obtener los IDs de los eventos favoritos:', error);
        return [];
    }
};
