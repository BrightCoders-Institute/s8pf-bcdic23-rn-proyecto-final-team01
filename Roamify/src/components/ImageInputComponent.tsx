import React, { useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { updateDataUser, uploadImageStorange } from '.';
import { ActionImagePicker, ImageInputProps, ImageResponse } from './types';
import { useAuth } from '../contexts/AuthContext';

const actions: ActionImagePicker[] = [
    {
        title: 'Select Image',
        type: 'library',
        options: {
            quality: 0.5,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        },
    },
];

const ImageInput = ({ setIsLoading }: ImageInputProps) => {
    const { userId } = useAuth();

    const handleImageUpload = useCallback(async () => {
        try {
            const options = actions[0].options;
            const imageResponse = await ImagePicker.launchImageLibrary(options);
            setIsLoading(true);
            const uploadedImageData = await uploadImageStorange({
                uri: imageResponse.assets[0].uri,
                route: "profileImage"
            });
            const data = { profileImgURL: uploadedImageData }
            await updateDataUser({ userId, data });
            console.log('Image uploaded successfully');
        } catch (error) {
            console.error('Error handling image upload:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    return (
        <View>
            <View>
                <Button
                    title="Selecciona y guarda una imagen"
                    onPress={handleImageUpload}
                />
            </View>
        </View>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aliceblue',
    },
});
