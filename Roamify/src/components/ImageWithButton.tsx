import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { fetchImageUrl, updateDataUser, uploadImageStorange } from '.';
import { ActionImagePicker, ImageInputProps } from './types';
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

const ImageWithButton = ({ setIsLoading }: ImageInputProps) => {
    const { userId } = useAuth();
    const [imageUrl, setImageUrl] = useState<null | string>(null);

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
            loadImage()
        } catch (error) {
            console.error('Error handling image upload:', error);
            return
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const loadImage = async () => {
        setIsLoading(true);
        try {
            const fetchImg = await fetchImageUrl(userId);
            setImageUrl(fetchImg);
        } catch (error) {
            console.error('Error loading image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadImage()
    }, [userId])

    return (
        <View style={styles.container}>
            <Image
                source={imageUrl ? { uri: imageUrl } : require('../assets/user.jpg')}
                style={styles.image} />
            <TouchableOpacity onPress={handleImageUpload} style={styles.button}>
                <Text style={styles.textBtn}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#000'
    },
    button: {
        position: 'absolute',
        top: 60,
        right: 120,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    textBtn: {
        color: 'white',
        fontSize: 30,
    }
});

export default ImageWithButton;
