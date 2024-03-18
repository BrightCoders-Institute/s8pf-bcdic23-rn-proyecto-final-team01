import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { ImageStorageProp, ResquestUpdateUser } from './types';

export const uploadImageStorange = async (
    { uri, route }: ImageStorageProp
): Promise<string> => {
    try {
        if (!uri) {
            console.log(
                'No image selected', 'Please select an image before uploading'
            );
            console.log("Error: Selecciona una imagen porfavor");
        }
        const newName = createRadomName()
        const reference = storage().ref(`${route}/${newName}`);
        await reference.putFile(uri);
        const url = await reference.getDownloadURL()
        console.log(url);
        console.log('Image uploaded successfully');
        return url
    } catch (error) {
        console.error('Error uploading image:', error);
        console.log('Error: An error occurred while uploading the image');
    }
};

export const createRadomName = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const lenString = 16;
    let randomstring = '';

    for (var i = 0; i < lenString; i++) {
        const rnum = Math.floor(Math.random() * characters.length);
        randomstring += characters.substring(rnum, rnum + 1);
    }
    let date = Date.now();
    let name = `${randomstring}+${date}`
    return name;
}

export const updateDataUser = async (
    { userId, data }: ResquestUpdateUser
) => {
    try {
        const userRef = firestore().collection('users').doc(userId);
        await userRef.update(data);
        console.log('Documento actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
    }
};

export const fetchImageUrl = async (
    userId: string
): Promise<string> => {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();
        if (userData && (typeof (userData.profileImgURL) === 'string')) {
            return userData.profileImgURL
        }
    } catch (error) {
        console.error('Error fetching image URL:', error);
    }
}