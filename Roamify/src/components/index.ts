import storage from '@react-native-firebase/storage';
import { ImageStorageProp } from './types';

export const uploadImageStorange = async ({ uri, route }: ImageStorageProp): Promise<string> => {
    try {
        if (!uri) {
            console.log(
                'No image selected', 'Please select an image before uploading'
                );
            return "Error: Selecciona una imagen porfavor";
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
        return 'Error: An error occurred while uploading the image';
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