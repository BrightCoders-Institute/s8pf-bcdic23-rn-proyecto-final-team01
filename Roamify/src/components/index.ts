import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  ImageStorageProp,
  ResquestReviewsProps,
  ResquestUpdateUser,
  ResquestlocationProps,
} from './types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {getReviews} from '../hooks/getReviews';

export const uploadImageStorange = async ({
  uri,
  route,
}: ImageStorageProp): Promise<string> => {
  try {
    if (!uri) {
      console.log('No image selected, Please select an image before uploading');
      console.log('Error: Selecciona una imagen porfavor');
    }
    const newName = createRadomName();
    const reference = storage().ref(`${route}/${newName}`);
    await reference.putFile(uri);
    const url = await reference.getDownloadURL();
    console.log('Image uploaded successfully');
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    console.log('Error: An error occurred while uploading the image');
  }
};

export const createRadomName = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const lenString = 16;
  let randomstring = '';
  for (var i = 0; i < lenString; i++) {
    const rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum + 1);
  }
  return `${randomstring}+${Date.now()}`;
};

export const updateImageUrlProfile = async ({
  userId,
  data,
}: ResquestUpdateUser) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    await userRef.update(data);
    console.log('Documento actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el documento:', error);
  }
};

export const fetchImageUrl = async (userId: string): Promise<string> => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    if (userData && typeof userData.profileImgURL === 'string') {
      return userData.profileImgURL;
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
  }
};

export const getUserDataAuten = (): FirebaseAuthTypes.User => {
  const user = auth().currentUser;
  if (user) {
    return user;
  } else {
    // El usuario no está autenticado o el objeto de usuario es nulo
    throw new Error('No hay usuario autenticado.');
  }
};

export const changePassword = async (password: string, newPassword: string) => {
  const user = auth().currentUser;
  if (user) {
    const credential = auth.EmailAuthProvider.credential(user.email, password);
    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      console.log('Contraseña actualizada con éxito');
    } catch (error) {
      console.error('Error al reautenticar o actualizar la contraseña:', error);
    }
  } else {
    console.error('No hay un usuario autenticado');
  }
};

export const getHighlightedLocations = async (
  locationsArray: ResquestlocationProps[],
) => {
  const filteredLocations = [];
  for (const location of locationsArray) {
    const reviewsData = await getReviews(location.id);
    if (
      reviewsData &&
      reviewsData.reviewsData &&
      reviewsData.reviewsData.length > 0
    ) {
      const _reviewsData: ResquestReviewsProps[] = reviewsData.reviewsData;
      const average = calculateAverageRating(_reviewsData);
      if (average && average >= 4.5) {
        filteredLocations.push(location);
      }
    }
  }
  return filteredLocations;
};

export const calculateAverageRating = (
  reviews: ResquestReviewsProps[],
): number | null => {
  const validReviews = reviews.filter(
    review => typeof review.rating !== 'undefined',
  );
  if (validReviews.length === 0) return null;
  const ratingsArray: number[] = validReviews.map(
    review => review.rating as number,
  );
  const sumAllRatings = ratingsArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const average = Math.round((sumAllRatings / validReviews.length) * 10) / 10;
  return average;
};
