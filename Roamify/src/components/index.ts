import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { ImageStorageProp, ResquestUpdateUser, userDataProp, } from './types';
import auth, { firebase } from '@react-native-firebase/auth';

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
    return `${randomstring}+${Date.now()}`
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

export const fetchUserData = async (
    userId?: string
): Promise<userDataProp> => {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();
        if (userData) {
            return userData
        }
    } catch (error) {
        console.error('Error fetching image URL:', error);
    }
}

export const getUserDataAuten = () => {
    const user = auth().currentUser;
    if (user) {
        return user;
    } else {
        // El usuario no está autenticado o el objeto de usuario es nulo
        throw new Error('No hay usuario autenticado.');
    }
};

export const updatePassword = async (newPassword: string) => {
    try {
        const user = firebase.auth().currentUser;
        // Verifica si el usuario está autenticado
        if (!user) {
            throw new Error('No hay usuario autenticado.');
        }
        console.log(user);

        console.log(newPassword);
        // Actualiza la contraseña del usuario
        await user.updatePassword(newPassword);

        console.log('Contraseña actualizada correctamente.');
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error.message);
        throw error;
    }
};

export const reauthenticateAndChangePassword = async (
    currentPassword: string, newPassword: string
) => {
    try {
        const user = getUserDataAuten();
        // Crear un credential con la contraseña actual del usuario
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        // Reautenticar al usuario con la credencial
        await user.reauthenticateWithCredential(credential);
        // Cambiar la contraseña del usuario
        await user.updatePassword(newPassword);
        console.log('Contraseña actualizada exitosamente.');
    } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
            // Si se requiere una autenticación reciente, solicitar al usuario que vuelva a autenticarse
            console.log('Se requiere una autenticación reciente. Solicitando al usuario que vuelva a autenticarse.');
            // Aquí se puede redirigir al usuario a una pantalla de inicio de sesión o mostrar un modal de autenticación.
        } else {
            // Manejar otros errores
            console.error('Error al cambiar la contraseña:', error.message);
        }
    }
};

